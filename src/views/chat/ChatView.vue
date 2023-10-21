<script setup>
import { nextTick } from 'vue';
import Conversation from '../../components/chat/conversation.vue';
import message from '../../components/chat/message.vue'
import { useLoadStore } from '../../store/InitialLoadStore';
import { useItemChatStore } from '../../store/ItemChatStore';
import { useUserStore } from '../../store/UserStore';
import { mapStores } from 'pinia';
</script>

<template>

  <!-- modal -->
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5 text-dark" id="staticBackdropLabel">
          The items being traded
        </h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">

        <!-- Checklists go here -->
        <div class="container">


          <div class="row">
            <div class="col-6">
              <h3 class="text-center">Listed Items by me</h3>

              <div v-for="item in myListedItems">
                <input :id="item._id" @change="updateMyItems" type="checkbox" :value="item._id"  
                :checked="mySelectedItems.includes(item._id)">
                <label :for="item._id" class="form-check-label d-inline">  {{ "   " +  item.itemName }}</label>
              </div>
              
            </div>
            <div class="col-6">
              <h3 class="text-center">Listed Items by {{ truncatedChattingWith }}</h3>
              <div v-for="item in otherListedItems">
                <input type="checkbox" :value="item._id"  
                :checked="itemChatStore.items.includes(item._id)" disabled >
                <label class="form-check-label d-inline">  {{ "   " +  item.itemName }}</label>
              </div>
              
            </div>
          </div>
        </div>
        <!-- checklists end -->
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-success">End chat success</button>
      </div>
    </div>
  </div>
</div> 
<!-- modal end -->


  <section ref="chatContainer" :class="chatContainerClasses" :style="{'height': chatHeight }">


  <div class="conversations" >
    <button class="chat-header position-sticky top-0">Chats!</button>
    <Conversation :id="id" v-for="chat,idx in currentChats" :username="userStore.username" :chat="chat" :chosen="chattingWith && idx ==0"
    @click="swapScreenToChatting"
     ></Conversation>
  </div>


  <header class="p-3 m-0">
    <button class="go-back bg-transparent me-3" id='back-button' @click="swapScreenToConversations">⬅️</button>
      <h2>{{ chattingWith ? truncatedChattingWith : "No chat selected"}}</h2>  

      <!-- to limit the length of full name max 14-->

    <!-- Hide this button when no chat is displayed -->
    <button class="btn btn-light" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
      🛒
    </button>
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
    <form @submit.prevent="sendMessage">
      <input type="text" class="form-control" v-model="textContent">
    
      <input type="submit" class="btn btn-success" value="Send!" >
    </form>
  </footer>



</section>




</template>

<style scoped>
.chat-container {
  border: 1px solid pink;
  display: grid;
  grid-template-columns: 290px 1fr;
  grid-template-rows: 10vh auto 10vh;
  column-gap: 1rem;
  /* height: 90vh; */
  overflow-x: hidden;

  column-gap: 0;
}

.conversations {
  /* height: 90vh; */
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  grid-row: 1 / -1;

}

.chat-header {
  padding-block: 12px;
  border: none;
  background: darkblue;
  color:white;
  font-size: 1rem;

}

.messages {
  /* height: 50vh; */
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.messages,
.conversations,
header {
  transition: transform 0.4s, opacity 0.3s;
}

@media (max-width: 600px) {
  .chat-container {
    gap: 0;
    grid-template-columns: 100vw 100vw;
  }

  footer > * {
  height:30%;
}

  .chat-container.conversations-mode header,
  .chat-container.messages-mode footer,

  .chat-container.conversations-mode .messages {
    transform: translateX(100%);
    transition-timing-function: ease-in;
    opacity: 0;
  }

  .chat-container.conversations-mode .conversations {
    opacity: 1;
    transition-timing-function: ease-out;
  }

  .chat-container.messages-mode header,
  .chat-container.messages-mode footer,
  .chat-container.messages-mode .messages {
    transform: translateX(-100%);
    transition-timing-function: ease-out;
    opacity: 1;
  }

  .chat-container.messages-mode .conversations {
    transform: translateX(-100%);
    transition-timing-function: ease-in;
    opacity: 0;
  }
}

/* Not important from here on */
/* =========================== */
/* =========================== */
/* =========================== */

* {
  box-sizing: border-box;
}


body {
  width: min(100vw, 600px);
  margin: auto;
}

header {
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid black;
  /* margin-bottom: 1rem; */
  padding-inline: 1rem;
  height:10vh;
  background-color:red
}

footer form {
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
  padding-inline: 1rem;
  height:10vh
}


.messages {
  padding-inline: 1rem;
  /* overflow: scroll; */
}

.go-back {
  border: none;
  font-size: 1.2rem;
}

@media (min-width: 600px) {
  .go-back {
    display: none;
  }

}

h2 {
  font-size: 1.5rem;
  flex: 1;
  color : white
}

.msgBox {
  padding: 1rem;
  width: fit-content;
  border-radius: 5px 5px 5px 0;
  background-color: cornsilk;
  color: midnightblue;
}

.msgBoxThem {
  background-color: lavender;
  border-radius: 5px 5px 0 5px;
}

footer > * {
  height:70%;
  box-sizing: border-box;
}

</style>


<script>
// import popover from "bootstrap/js/src/popover"
export default {
  data(){
    return {
      // css classes
      conversationsModeClass : "conversations-mode",
      messagesModeClass : "messages-mode",
      chatContainerClasses :[
        'chat-container',
        'mt-3' 
    ],

      // UI related
      height : 0,
      width:0,

      //information about user
      usernamesChattingNow : [],


      //left panel info
      currentChats : [],

      //right panel info
      firstScroll : false,
      chattingWith : null,
      chattingWithFullName : null,

      myRole : 'buyer',
      currentMessages : [],
      textContent : "",

      myListedItems : [],
      mySelectedItems : [], // all in id only
      otherListedItems: [],
      //otherSelectedItem is in the itemChatStore also in id


      endChatSuccessState : null, //either waiting or needRespond or null


    }
  },
  methods : {
    swapScreenToChatting(){
      var idx = this.chatContainerClasses.indexOf(this.conversationsModeClass)
      if(idx != -1){
        this.chatContainerClasses.splice(idx,1)
      }
      this.chatContainerClasses.push(this.messagesModeClass)
    },
    swapScreenToConversations(){
      var idx = this.chatContainerClasses.indexOf(this.messagesModeClass)
      if(idx != -1){
        this.chatContainerClasses.splice(idx,1)
      }
      this.chatContainerClasses.push(this.conversationsModeClass)


    },
    async loadCurrentChats(){


      try {
         var response = await this.axios.get(`${import.meta.env.VITE_BACKEND}/chat`);
         console.log(response)

          this.currentChats = response.data.data

          this.usernamesChattingNow = this.currentChats.map(chat => {
            return chat.buyer.username!=this.userStore.username ? chat.buyer.username : chat.seller.username
          })
          // console.log(peopleChattingNow)
          // if (peopleChattingNow.includes(this.$route.params.username)){
          //   this.activeChatUser=this.$route.params.username
          //   this.loadChat()
          // } else {
          //   this.$router.push("/chat")
          // }
          //include data
      } catch (e) {
        console.log(e)
        this.$toast.error("Failed to load current chats. Please reload")
      }

    },

    async loadChat(){
      try {
        this.chattingWith = this.$route.params.username 

        var ajax1 =  await this.axios.get(`${import.meta.env.VITE_BACKEND}/chat/user/${this.chattingWith}`)
        var ajax2 = await this.axios.get(`${import.meta.env.VITE_BACKEND}/items/search/`,{
                                params : { itemType : "Listed",
                              username: this.userStore.username}
                              })
        var ajax3 = await this.axios.get(`${import.meta.env.VITE_BACKEND}/items/search/`,{
                      params : { itemType : "Listed",
                    username: this.chattingWith}
                    })

        var currentChat = ajax1.data.data
        this.currentMessages = currentChat.messages

        this.myRole = currentChat.seller.username == this.userStore.username ? "seller" : "buyer"
        this.mySelectedItems =  currentChat[this.myRole+"Items"].map((item)=>item._id )
        
        this.itemChatStore.username = this.chattingWith
        this.itemChatStore.items = currentChat[(this.myRole=='seller' ? 'buyer' : 'seller')+'Items'].map((item)=>item._id )


        this.endChatSuccessState = 
            (currentChat[this.myRole+'Close'] ? 'waiting' : (
              (currentChat.buyerClose || currentChat.sellerClose) ? 'needRespond' : null))
        
        this.myListedItems = ajax2.data.data
        this.otherListedItems = ajax3.data.data
        // this.scrollChat()

        this.swapScreenToChatting()

        this.chattingWithFullName = currentChat[(this.myRole=='seller' ? 'buyer' : 'seller')].fullName
      } catch (e) {
        console.error(e)
        this.$toast.error("Failed to load user chat")
      }
    },
    scrollChat(){
      console.log(this.$refs)
      nextTick(
        this.$refs.msgs[this.$refs.msgs.length-1].$el.scrollIntoView({
        behavior : 'smooth'
      })

      )
    },
    sendMessage(){
      if (this.textContent){
        this.currentMessages = [...this.currentMessages, {
        sender : this.myRole,
        textContent :this.textContent,
        createdAt : new Date().toISOString()
      }]
      this.textContent=""
      }
    },
    async checkParamsAndLoad(){
      if (this.usernamesChattingNow.includes(this.$route.params.username)){
      var index = this.usernamesChattingNow.indexOf(this.$route.params.username)
      this.chattingWith = this.$route.params.username

      var chatToMove = this.currentChats[index]
      this.currentChats.splice(index,1)
      this.currentChats= [chatToMove, ...this.currentChats]

      var usernameToMove = this.usernamesChattingNow[index]
      this.usernamesChattingNow.splice(index,1)
      this.usernamesChattingNow.unshift(usernameToMove)

      await this.loadChat()
    } else {
      this.$router.push('/chat')
    }
    }
  },

  watch : {
    currentMessages(){
      
      nextTick(()=>{
        if(!this.firstScroll){
          this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight
          this.firstScroll=true
        } else {
          this.scrollChat() 
        }
      })
    }
  },



  computed : {
    chatHeight(){
      return this.height-80 + 'px';
    },
    convoHeight(){
      return (this.height-80) -(this.height*0.21) +'px'
    },
    truncatedChattingWith(){
      var subStr = this.chattingWithFullName?.substr(0,14) ?? ""
      return subStr + (subStr.length == 14 ?  "..." : "")

    },
    ...mapStores(useUserStore,useLoadStore,useItemChatStore)

  },

  async created(){
    this.height =  window.innerHeight;   
    this.width = window.innerWidth;
    this.$watch(
      () => this.$route.params,
      async (toParams, previousParams) => {
        // react to route changes...
        this.loadStore.loading= true
        await this.checkParamsAndLoad()
        this.loadStore.loading = false
      }
    )

    this.loadStore.loading = true
    await this.loadCurrentChats()
      await this.checkParamsAndLoad()

    this.loadStore.loading = false
  },
  async mounted(){

  }
}
</script>