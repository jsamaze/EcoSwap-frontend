<template>
  <section class="chat-container" :style="{'height': chatHeight }">
  <div class="conversations" >
    <button class="conversation position-sticky top-0">Chats!</button>

    <button class="conversation p-3" >
      <div class="text-start fs-5">
        Joshua   
        <div class="float-end fs-6">27/7</div>
      </div>
      <div class="text-start">Heyo do you have the item </div>
    </button>
    <button class="conversation">Item 2</button>
    <button class="conversation">Item 3</button>
    <button class="conversation">Item 4</button>
    <button class="conversation">Item 5</button>
    <button class="conversation">Item 6</button>
    <button class="conversation">Item 7</button>
    <button class="conversation">Item 8</button>
    <button class="conversation">Item 9</button>
    <button class="conversation">Item 10</button>
    <button class="conversation">Item 11</button>
    <button class="conversation">Item 12</button>
    <button class="conversation">Item 13</button>
    <button class="conversation">Item 14</button>
    <button class="conversation">Item 15</button>
    <button class="conversation">Item 16</button>
    <button class="conversation">Item 17</button>
    <button class="conversation">Item 18</button>
    <button class="conversation">Item 19</button>
    <button class="conversation">Item 20</button>
  </div>
  <header class="p-3 m-0">
    <button class="go-back" id='back-button'>◀</button>
    <h2>
      Hyinki
    </h2>
    <button>See items traded</button>
  </header>
  <div class="messages" :style="{'height':  convoHeight}">
    <article class="message">
      <article class="msgBox">H!</article>
      <article class="msgTime">27/7, 19:19</article>
    </article>
    <article class="message">
      <article class="msgBox msgBoxThem">Bye!</article>
      <article class="msgTime">27/7, 19:19</article>
    </article>
    <article class="message">
      <article class="msgBox">H!</article>
      <article class="msgTime">27/7, 19:19</article>
    </article>
    <article class="message">
      <article class="msgBox msgBoxThem">Bye!</article>
      <article class="msgTime">27/7, 19:19</article>
    </article>
    <article class="message">
      <article class="msgBox">H!</article>
      <article class="msgTime">27/7, 19:19</article>
    </article>
    <article class="message">
      <article class="msgBox msgBoxThem">Bye!</article>
      <article class="msgTime">27/7, 19:19</article>
    </article>

  </div>
  <footer>

    <div class="btn-group dropup">
      <button type="button" class="btn btn-secondary dropdown-toggle btn btn-info" data-bs-toggle="dropdown" aria-expanded="false">
        Options
      </button>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#">End chat</a></li>
        <li><a class="dropdown-item" href="#">Mark chat a success</a></li>
      </ul>
    </div>
    <input type="text" name="" id="" class="form-control"><button class="btn btn-success">Send!</button>
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
  
  :hover {
    background-color: grey;
  }
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

footer {
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

.conversation {
  padding-block: 12px;
  border: none;
  background: aliceblue;
  font-size: 1rem;
}

h2 {
  font-size: 1.5rem;
  flex: 1;
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

.message:nth-child(even) {  /*opposite*/
  align-self: end;
}

.msgTime{
  font-size: smaller;
}

footer > * {
  height:70%;
  box-sizing: border-box;
}

</style>


<script>
import popover from "bootstrap/js/src/popover"

export default {
  data(){
    return {
      height : 0,
    }
  },

  computed : {
    chatHeight(){
      return this.height-80 + 'px';
    },
    convoHeight(){
      return (this.height-80) -(this.height*0.25) +'px'
    }
  },
  mounted(){
    this.height =  window.innerHeight;
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new popover(popoverTriggerEl))
    
    
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