<script setup>
import Conversation from '../../components/chat/conversation.vue';
import message from '../../components/chat/message.vue'
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
              <h3 class="text-center">ABC</h3>
              <div>
                <input class="form-check-input" type="checkbox" name="lorem" id="0">  
                <label for="0" class="form-check-label d-inline">    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed quibusdam repellat eius ex amet unde modi ullam delectus obcaecati, magni alias, deserunt nihil. Asperiores cum fugit nihil reprehenderit, numquam in!</label>
              </div>
            </div>
            <div class="col-6">
              <h3 class="text-center">ABC</h3>
              <ul>
                <li>lmao</li>
                <li>a</li>
                <li>x</li>
                <li>y</li>
                <li>b</li>
              </ul>            
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


  <section class="chat-container mt-3" :style="{'height': chatHeight }">


  <div class="conversations" >
    <button class="chat-header position-sticky top-0">Chats!</button>
    <!-- <Conversation :username="username" :chat="latestChats[0]" :chosen="false"></Conversation> -->
  </div>


  <header class="p-3 m-0">
    <button class="go-back bg-transparent me-3" id='back-button'>⬅️</button>
      <h2>SSSSSSSSSSSSSS...</h2>  

      <!-- to limit the length of full name max 14-->

    <!-- Hide this button when no chat is displayed -->
    <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
      🛒
    </button>
  </header>


  <div class="messages py-3" :style="{'height':  convoHeight}">
    <message :userRole="userRole" :message="sampleMessage"></message>
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
    <form @submit.prevent>
      <input type="text" class="form-control">
    
      <input type="submit" class="btn btn-success" value="Send!">
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


      height : 0,
      username : 'sarah',

      latestChats : [],


      userRole : 'buyer',
      sampleMessage : 			{
				"sender": "buyer",
				"textContent": "kk",
				"_id": "651ac80298e56021d1b7fd28",
				"createdAt": "2023-10-02T13:39:14.884Z",
				"updatedAt": "2023-10-02T13:39:14.884Z"
			},
    }
  },

  computed : {
    chatHeight(){
      return this.height-80 + 'px';
    },
    convoHeight(){
      return (this.height-80) -(this.height*0.25) +'px'
    },
    ...mapStores(useUserStore)
  },
  mounted(){
    this.height =  window.innerHeight;   
        
    const gridElement = document.getElementsByClassName("chat-container")[0];
    const conversations = document.getElementsByClassName("conversations")[0];
    const backButton = document.getElementById("back-button");
    const conversationsModeClass = "conversations-mode";
    const messagesModeClass = "messages-mode";

    conversations.addEventListener("click", () => {
      gridElement.classList.remove(conversationsModeClass);
      gridElement.classList.add(messagesModeClass);
    });

    backButton.addEventListener("click", () => {
      gridElement.classList.remove(messagesModeClass);
      gridElement.classList.add(conversationsModeClass);
});

  }
}
</script>