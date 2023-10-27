<template>
    <button :class="styleObj"  @click="$router.push(`/chat/${usernameThem}`)">
      <div class="text-start fs-5">
        {{ fullName }}   
          <!-- to limit the length of full name max 14-->

        <div class="float-end fs-6">{{ dateString }}</div>
      </div>
      <div class="text-start">{{ latestMessageTextContent }}</div>
    </button>
</template>

<style scoped>
.conversation {
  padding-block: 12px;
  border: none;
  background: aliceblue;
  font-size: 1rem;

}


:hover , .chosen {
    background:  #d9d9d9;
  }



</style>


<script>
import moment from 'moment'
export default {
  props : {
    chat : Object,
    username : String,
    chosen : Boolean
  },
  computed : {
    styleObj(){
        return {"conversation" : true, "p-3" : true, "chosen" : this.chosen}
        // return ['conversation','p-3','chosen']
    },
    dateString (){
      if (this.chat.latestMessage){
        var date = new moment(this.chat.latestMessage.createdAt) 
        return  date.format("DD/MM")
      }
      return null
    },
    latestMessageTextContent (){
      var temp = this.chat.latestMessage ? this.chat.latestMessage.textContent : "No messages yet..."
      var subStr = temp.substr(0,23)
      return subStr + (subStr.length == 23 ?  "..." : "")
    },
    fullName(){

      var userRole = this.chat.seller.username == this.username ? 'seller' : 'buyer';
      var oppRole = userRole =='seller' ? 'buyer' : 'seller'
      console.log(this.chat[oppRole].fullName)
      var subStr = this.chat[oppRole].fullName.substr(0,14)
      return subStr + (subStr.length == 14 ?  "..." : "")
    },
    usernameThem(){
      var userRole = this.chat.seller.username == this.username ? 'seller' : 'buyer';
      var oppRole = userRole =='seller' ? 'buyer' : 'seller'
      return this.chat[oppRole].username
    }
  }
}
</script>