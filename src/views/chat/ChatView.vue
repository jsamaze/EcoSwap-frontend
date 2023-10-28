<script setup>
import { nextTick } from 'vue';
import Conversation from '../../components/chat/conversation.vue';
import message from '../../components/chat/message.vue'
import { useLoadStore } from '../../store/InitialLoadStore';
import { useItemChatStore } from '../../store/ItemChatStore';
import { useUserStore } from '../../store/UserStore';
import {useChatStore} from '../../store/ChatStore'
import { mapStores } from 'pinia';
import {socket} from '../../socket'
import { useNotificationStore } from '../../store/NotificationStore';

import bsModal from 'bootstrap/js/src/modal'
import CircularProgress from '../../components/circularProgress.vue';
</script>

<template>

  <!-- modal -->
<div class="modal fade" id="staticBackdrop" ref="myModal" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5 text-dark" id="staticBackdropLabel">
          {{ modalHeading}}
        </h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="seeChecklist=true"></button>
      </div>
      <div class="modal-body">

        <!-- Checklists go here -->
        <div class="container" v-if="seeChecklist">


          <div class="row">
            <div class="col-6">
              <h3 class="text-center">Listed Items by me</h3>

              <div v-for="item in myListedItems">
                <input :id="item._id" type="checkbox" v-model.lazy='mySelectedItems' :value="item._id" :disabled="chatClosed">
                <label :for="item._id" class="form-check-label d-inline">  {{ "   " +  item.itemName }}</label>
              </div>
              
            </div>
            <div class="col-6">
              <h3 class="text-center">Listed Items by {{ truncatedChattingWith }}</h3>
              <div v-for="item in otherListedItems">
                <input type="checkbox" :value="item._id"  v-model="itemChatStore.items" disabled >
                <label class="form-check-label d-inline">  {{ "   " +  item.itemName }}</label>
              </div>
              
            </div>
          </div>
        </div>
        <!-- checklists end -->
        <div class="container" v-else>
          <h3 class="text-center my-3">
            {{ endChatSuccessState =='needRespond' ? `${chattingWithFullName} is inviting you to close the trade.` :""}} 
             Do you want to close the deal with {{ chattingWithFullName }}?
            </h3>
        </div>
      </div>
      <div class="modal-footer" v-if="seeChecklist">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-success" @click="switchModal" :disabled="endChatSuccessState=='waiting'">{{ secondButton }}</button>
      </div>
      <div class="modal-footer" v-else>
        <button type="button" class="btn btn-secondary" @click="switchModal" >Go Back</button>
        <button type="button" class="btn btn-success" @click="requestEndChat" data-bs-dismiss="modal" >{{ endChatSuccessState =='needRespond' ? 'Accept' : "Propose to trade" }}</button>
        <button type="button" class="btn btn-danger" @click="rejectEndChat" v-if="endChatSuccessState=='needRespond'" data-bs-dismiss="modal">Reject</button>

      </div>
    </div>
  </div>
</div> 
<!-- modal end -->


<!-- massive credit to https://catalincodes.com/posts/responsive-chat-with-css-grid -->

  <section ref="chatContainer" :class="chatContainerClasses" :style="{'height': chatHeight }">


  <div class="conversations" >
    <button class="chat-header position-sticky top-0 ">
      Chats!
      <div class="form-check form-switch " style="margin-left: 5%;">
        <input class="form-check-input"  type="checkbox" role="switch" id="flexSwitchCheckChecked" v-model="seeClosedChats">
        <label class="form-check-label" for="flexSwitchCheckChecked">See {{ seeClosedChats ? "completed" : ""}} trade {{ seeClosedChats ? "" : "in progress"}}</label>
      </div>
    </button>
    <Conversation :id='chat._id' v-for="chat,idx in currentChats" :username="userStore.username" :chat="chat" :chosen="chattingWith && idx ==0"
    
     @click="$route.params.chatId == chat._id ? swapScreenToChatting() : console.log('nothing :>> ', 'nothing');"></Conversation>

     <div class="m-auto p-3 text-center" v-if="currentChats.length ==0">
        You have yet to start a chat
        <br> Browse through our marketplace to start trading!
     </div>
  </div>


  <header class="p-3 m-0">
    <button class="go-back bg-transparent me-3" id='back-button' @click="swapScreenToConversations">⬅️</button>
      <h2>{{ chattingWith ? truncatedChattingWith : "No chat selected"}}</h2>  

      <!-- to limit the length of full name max 14-->

    <!-- Hide this button when no chat is displayed -->

  </header>


  <div ref="messages" id="messages" class="messages py-3" :style="{'height':  convoHeight}">
    <message v-for='msg in currentMessages' :userRole="myRole" :message="msg" ref="msgs"></message>
  </div>


  <footer>
    <!-- <div class="btn-group dropup">

      <button type="button" class="btn btn-secondary dropdown-toggle btn btn-info" data-bs-toggle="dropdown" aria-expanded="false">
        Options
      </button>

      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#">End chat</a></li>
        <li><a class="dropdown-item" href="#">Mark chat a success</a></li>
      </ul>

    </div> -->

    <!-- input text or text area? -->
    <form @submit.prevent="submitMsg">
      <button type="button" class="btn p-1" style="background-color: #8a9f53;" data-bs-toggle="modal" data-bs-target="#staticBackdrop"  :disabled="!$route.params.chatId">
      <img src="../../assets/images/trade.png" style="height:100%">
    </button>
      <input type="text" class="form-control" v-model="textContent" :disabled="!$route.params.chatId">
    
      <input type="submit" class="btn btn-success" value="Send!" :disabled="!$route.params.chatId" >
    </form>
  </footer>



</section>




</template>

<style scoped>
@import '@/assets/ChatView.css';
</style>

<script>
// import popover from "bootstrap/js/src/popover"
export default {
  data(){
    return {
      // css classes
      conversationsModeClass : "conversations-mode",
      messagesModeClass : "messages-mode",
      chatContainerClasses :
        'chat-container ',

      // UI related
      height : 0,
      width:0,

      //information about user
      chatIdChattingNow : [],


      //left panel info
      currentChats : [],
      seeClosedChats : false,

      //right panel info
      firstScroll : false,
      currentChatId : null,
      chattingWith : null,
      chattingWithFullName : null,

      myRole : 'buyer',
      currentMessages : [],
      textContent : "",

      myListedItems : [],
      mySelectedItems : [], // all in id only
      otherListedItems: [],
      //otherSelectedItem is in the itemChatStore also in id
      chatClosed : false,

      //modal related
      seeChecklist : true,
      myModal : null,

      //to decide second screen or button
      endChatSuccessState : null, //either waiting or needRespond or null

      debouncedChecklist : null,


    }
  },
  methods : {
    switchModal(){
      this.seeChecklist= !this.seeChecklist;
    },
    onResize(){
      this.height =  window.innerHeight;   
      this.width = window.innerWidth;

    },
    swapScreenToChatting(){
      this.chatContainerClasses = 'chat-container ' + this.messagesModeClass
    },
    swapScreenToConversations(){
      this.chatContainerClasses = 'chat-container ' + this.conversationsModeClass
    },
    async loadCurrentChats(){


      try {
         var response = await this.axios.get(`${import.meta.env.VITE_BACKEND}/chat`,{
          params : {closed : this.seeClosedChats}
         });
         console.log(response)

          this.currentChats = response.data.data

          this.chatIdChattingNow = this.currentChats.map(chat => {
            return chat._id
          })
      } catch (e) {
        console.log(e)
        this.$toast.error("Failed to load current chats. Please reload")
      }

    },

    async loadChat(){
      try {
        this.currentChatId = this.$route.params.chatId 

        var ajax1 =  await this.axios.get(`${import.meta.env.VITE_BACKEND}/chat/${this.currentChatId}`)


        var currentChat = ajax1.data.data
        console.log(currentChat, 'currentChat')
        this.currentMessages = currentChat.messages

        this.myRole = currentChat.seller.username == this.userStore.username ? "seller" : "buyer"
        this.chattingWith = currentChat.seller.username == this.userStore.username ? currentChat.buyer.username : currentChat.seller.username

        
        this.itemChatStore.username = this.chattingWith
        this.itemChatStore.items = currentChat[(this.myRole=='seller' ? 'buyer' : 'seller')+'Items'].map((item)=>item._id )
        this.itemChatStore.chatId = currentChat._id

        this.endChatSuccessState = 
            (currentChat[this.myRole+'Close'] ? 'waiting' : (
              (currentChat.buyerClose || currentChat.sellerClose) ? 'needRespond' : null))
        
        this.chatClosed = currentChat.sellerClose && currentChat.buyerClose
        this.seeClosedChats = this.chatClosed

        var ajax2 = await this.axios.get(`${import.meta.env.VITE_BACKEND}/items/search/`,{
                                params : { itemType : "Listed",
                              username: this.userStore.username,
                            traded : this.chatClosed ? true : false
                          }
                              })
        var ajax3 = await this.axios.get(`${import.meta.env.VITE_BACKEND}/items/search/`,{
                      params : { itemType : "Listed",
                    username: this.chattingWith,
                    traded : this.chatClosed ? true : false
                          }

                    })
        
        this.myListedItems = ajax2.data.data
        this.otherListedItems = ajax3.data.data
        this.mySelectedItems =  currentChat[this.myRole+"Items"].map((item)=>item._id )

        // this.scrollChat()

        this.swapScreenToChatting()

        this.chattingWithFullName = currentChat[(this.myRole=='seller' ? 'buyer' : 'seller')].fullName
      } catch (e) {
        console.error(e)
        this.$toast.error("Failed to load user chat")
        this.$router.push("/chat")
      }
    },
    scrollChat(){
      console.log('this.$refs :>> ', this.$refs);
      nextTick(
        this.$refs.msgs[this.$refs.msgs.length-1].$el.scrollIntoView({
        behavior : 'smooth'
      })
      )
    },
    async checkParamsAndLoad(){
      // if (this.usernamesChattingNow.includes(this.$route.params.username)){
      var index = this.chatIdChattingNow.indexOf(this.$route.params.chatId)
      // this.chatIdChattingNow = this.$route.params.chatId
      console.log('index :>> ', index);

      var chatToMove = this.currentChats[index]
      this.currentChats.splice(index,1)
      this.currentChats= [chatToMove, ...this.currentChats]

      var chatIdToMove = this.chatIdChattingNow[index]
      this.chatIdChattingNow.splice(index,1)
      this.chatIdChattingNow.unshift(chatIdToMove)

      // } else {
    //   this.$router.push('/chat')
    // }
    },

    sendMessage(textContent){
      this.currentMessages=[...this.currentMessages,{
            sender:this.myRole,
            textContent: textContent,
            createdAt: new Date().toISOString(),
          }]
      this.currentChats.forEach(element => {
        if(element._id == this.currentChatId && (element.seller.username == this.chattingWith ||element.buyer.username == this.chattingWith )){
          element.latestMessage = {
            sender:this.myRole,
            textContent:textContent,
            createdAt: new Date().toISOString(),
          }
        }
      });

    
      socket.emit("sendMessage",{
        to : this.chattingWith,
        textContent: textContent,
      },this.currentChatId, async (response)=>{
        if (response.code==200){

        } else {
          console.log(repsonse.status)
          console.log(response.problem)
          this.$toast.error(`Failed to send ${textContent}`)
          
          this.loadStore.loading=true
          await this.loadChat()
          this.loadStore.loading=false
        }
      })
    },
    submitMsg(){
      if(this.$route.params.chatId && this.textContent.trim().length > 0){
        this.sendMessage(this.textContent)
        this.textContent=""
      }

    },

    updateMyItems(){
      if(!this.chatClosed){
        socket.emit("updateItemChat",this.chattingWith,this.mySelectedItems,(response)=>{
        console.log(response)
        if (response.code==200){

        } else {
          console.log(repsonse.status)
          console.log(response.problem)
          this.$toast.error(`Failed to set item ${textContent}`)
          
          this.$router.go(0)
        }
      })
      }
    },

    rejectEndChat(){

      this.seeChecklist=true
      this.axios.patch(`${import.meta.env.VITE_BACKEND}/chat/user/${this.chattingWith}`,null,{
        params: {reject:"True"}
      }).then(
        response => {
          if(response.data.status=="reset the process of closing chat"){
            this.$toast.warning("Sucessfully reset closing chat")
            this.endChatSuccessState=null
          }
          this.sendMessage(`I have rejected your offer to close trade`)
        })


    },
    requestEndChat(){

      this.seeChecklist = true

      this.axios.patch(`${import.meta.env.VITE_BACKEND}/chat/user/${this.chattingWith}`).then(
        response => {
          switch (response.data.status){
            case "endChatSuccess":
              this.$toast.success("Trade is successful! The chat and items are now archived!")
              this.sendMessage("This trade is now closed")
              this.$router.push('/')
              break;
            case "requestEndChatSuccess":
              this.$toast.warning("Please wait for the other party")
              this.endChatSuccessState = 'waiting';
              this.sendMessage(`I have proposed we close this deal.`)
              break;
            default:
              this.$toast.error(response.data.status)
              break;
          }
        }
      ).catch(error => {
        this.$toast.error(error.response.data.status)
      })

    },

     debounce_leading(func, timeout = 1000){
      let timer;
      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
      };
}


  },

  watch : {
    currentMessages(){
      
      nextTick(()=>{
        console.log('this.firstScroll :>> ', this.firstScroll);
        console.log('this.currentMessages :>> ', this.currentMessages);

        if(this.currentMessages.length > 0){
          if(!this.firstScroll){
          this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight
          this.firstScroll=true
          console.log('"whee" :>> ', this.firstScroll);

        } else {
          console.log('(this.width<= 600 && this.chatContainerClasses== "chat-container messages-mode") :>> ', (this.width<= 600 && this.chatContainerClasses== "chat-container messages-mode"));
          if( this.width > 600 || (this.width<= 600 && this.chatContainerClasses== "chat-container messages-mode")){
            this.scrollChat()
          }
        }
        }


      })
    },
    mySelectedItems(){
      if(this.chattingWith){
        this.debouncedChecklist()
      }
    },
    async seeClosedChats (){
      if(!(this.chatClosed ==true && this.seeClosedChats) ){
      var l = this.$loading.show()
        this.$router.push("/chat")
              //right panel info
      this.currentChatId = null
      this.chattingWith = null
      this.chattingWithFullName = null

      this.myRole = 'buyer'
      this.currentMessages = []
      this.firstScroll = false
      this.textContent = ""

      this.myListedItems = []
      this.mySelectedItems = []// all in id only
      this.otherListedItems= []
      this.itemChatStore.username = null
      this.itemChatStore.items =[]
      //otherSelectedItem is in the itemChatStore also in id
      this.chatClosed = false
      await this.loadCurrentChats()
      l.hide()
      }

    }
  },



  computed : {
    modalHeading(){
      if(this.seeChecklist){
        return "Items to be traded"
      }
    },
    chatHeight(){
      return this.height-80 + 'px';
    },
    convoHeight(){
      return (this.height-80) -(this.height*0.21) +'px'
    },
    truncatedChattingWith(){
      var subStr = this.chattingWithFullName?.substr(0,18) ?? ""
      return subStr + (subStr.length == 18 ?  "..." : "")

    },
    secondButton(){
      if(this.chatClosed){
        return "Trade is done"
      }
      if(!this.endChatSuccessState){
        return "Request to close the trade"
      } else if (this.endChatSuccessState=='waiting'){
        return `Waiting for ${this.chattingWith}`
      } else {
        return 'Accept/Reject'
      }
    },
    ...mapStores(useUserStore,useLoadStore,useItemChatStore,useChatStore,useNotificationStore)

  },

  async mounted(){
    this.height =  window.innerHeight;   
    this.width = window.innerWidth;

    this.debouncedChecklist = this.debounce_leading(()=>this.updateMyItems())


    // ALL WATCH HERE
    this.$watch(
      () => this.$route.params,
      async (toParams, previousParams) => {
        // react to route changes...
        if(toParams.chatId){
          this.loadStore.loading= true
          await this.loadChat()
          await this.checkParamsAndLoad()
          this.loadStore.loading = false
          this.swapScreenToChatting()
        }
      }
    )

    this.$watch(()=>this.chatStore.createdAt,function (newMessage){
      if ( this.chatStore.chatId == this.currentChatId){
        this.currentMessages= [...this.currentMessages, {
            sender: this.myRole=="buyer" ? "seller" : "buyer",
            textContent: this.chatStore.textContent,
            createdAt: this.chatStore.createdAt
        }]
      }
        this.currentChats.forEach(element => {
        if((element.seller.username == this.chattingWith ||element.buyer.username == this.chattingWith) && element._id == this.chatStore.chatId ){
          element.latestMessage = {
            sender:this.myRole=="buyer" ? "seller" : "buyer",
            textContent: this.chatStore.textContent,
            createdAt: this.chatStore.createdAt
          }
        }})
      })

      this.$watch(()=>this.notificationStore.time,async function (newNotification){
      switch (this.notificationStore.event) {
        case "newChat" : 
          await this.loadCurrentChats()
          // if (this.usernamesChattingNow.includes(this.$route.params.username)){
          //   var index = this.usernamesChattingNow.indexOf(this.$route.params.username)
          //   this.chattingWith = this.$route.params.username

          //   var chatToMove = this.currentChats[index]
          //   this.currentChats.splice(index,1)
          //   this.currentChats= [chatToMove, ...this.currentChats]

          //   var usernameToMove = this.usernamesChattingNow[index]
          //   this.usernamesChattingNow.splice(index,1)
          //   this.usernamesChattingNow.unshift(usernameToMove)
          // }
          break;
        case "endChatSuccess":
          if (this.notificationStore.usernameFrom == this.chattingWith){
            this.$router.go(0)
          }
          break;
        case "requestEndChatSuccess":
          if (this.chattingWith==this.notificationStore.usernameFrom){
            this.endChatSuccessState='needRespond'
          }          
          break;
        case "resetEndChatSuccess":
          if (this.chattingWith==this.notificationStore.usernameFrom){
            this.endChatSuccessState=null
          }
          break;
        }})
        
   

    //start to load the chats

    this.loadStore.loading = true
    if(this.$route.params.chatId){
      await this.loadChat()
    }
    await this.loadCurrentChats()
    if (this.$route.params.chatId){
      console.log("trigger")
      await this.checkParamsAndLoad()
    }

    this.loadStore.loading = false
    this.myModal = bsModal.getOrCreateInstance(this.$refs.myModal)
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
  },
  // mounted() {

  // },

  beforeDestroy() { 
    window.removeEventListener('resize', this.onResize); 
  },
}
</script>