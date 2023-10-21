<template>
    <article class="message">
      <article :class="{msgBox:true, msgBoxThem:isUser}">
        {{message.textContent}}
      </article>
      <article :class="{msgTIme:true, msgTimeThem:isUser}">{{ dateString }}</article>
    </article>
</template>

<style scoped>
.msgBox {
  padding: 1rem;
  width: fit-content;
  border-radius: 5px 5px 5px 0;
  background-color: cornsilk;
  color: midnightblue;
}


/* Add this class for opp - actually its opposite logic  */
/* them refers to user */
.msgBoxThem {
  background-color: lavender;
  border-radius: 5px 5px 0 5px;
  margin-left: auto;
  align-self: end;
}


.msgTime{
  font-size: smaller;
  text-align: start;   /*add this for opp*/
}

.msgTimeThem {
  text-align: end;
}
</style>


<script>
import moment from 'moment'
export default {
  props : {
    userRole : String,
    message : Object,
  },
  computed : {
    isUser(){
      return this.userRole  == this.message.sender
    },
    dateString (){
      var date = new moment(this.message.createdAt)
      var toReturn 
      if (date.isAfter(moment().subtract(1,'days'))){
        toReturn= date.fromNow()
      } else if (date.isAfter(moment().subtract(1,'week'))){
        toReturn = date.calendar()
      } else {
        toReturn = date.format("HH:mm DD/MM/YY")
      }
        
      return toReturn
    }
  }
}
</script>