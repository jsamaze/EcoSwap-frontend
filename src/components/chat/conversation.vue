<template>
    <button :class="styleObj" >
      <div class="text-start fs-5">
        {{ chat[oppRole].fullName }}   
        <div class="float-end fs-6">{{ dateString }}</div>
      </div>
      <div class="text-start">{{ chat.latestMessage.textContent }}</div>
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
    background: grey;
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
    userRole(){
      return this.chat.seller.username == this.username ? 'seller' : 'buyer'
    },
    oppRole(){
        return this.userRole =='seller' ? 'buyer' : 'seller'
    },
    dateString (){
      var date = new moment(this.chat.latestMessage.createdAt) 
      return  date.format("DD/MM")
    }
  }
}
</script>