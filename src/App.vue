<!-- 3 parts - script, template, style  -->

<script setup>
import { RouterView } from 'vue-router'
import { useUserStore } from './store/UserStore';
import { mapStores } from 'pinia';
import { useLoadStore } from './store/InitialLoadStore';
import Loading from 'vue-loading-overlay'
import NavBar from '/src/components/NavBar.vue';
import { useNotificationStore } from './store/NotificationStore';
import { useChatStore } from './store/ChatStore';
</script>


<template>

  <!-- this is to load the page initially -->
    <div class="vl-parent">
        <loading v-model:active="loadStore.loading"
          loader="bars"/>
    </div>
    <div class="d-flex flex-column min-vh-100 background">

      <header class="sticky-top">
        <NavBar ></NavBar>
      </header>


  <!-- Replaced by component in /router/index.js -->
  <main class="" >
  <RouterView />
  </main>
  <img class="d-none" src="./assets/images/scott-lord-uX1QIBXbkMA-unsplash.jpg"/>

  <footer v-if="!$route.fullPath.includes('chat')" class="background text-center text-lg-start mt-auto">
  <!-- Copyright -->
  <div class="text-center p-3 w-100 subtitle" style="background-color: rgba(0, 0, 0, 0.2);"> 
    © 2023 EcoSwap
  </div>
  
  </footer>

</div>
</template>

<style>
/* put CSS here */

header {
  display:table
}
  /* nav bar */
.navigation {
    background-color: #f7f7f7;
  }

.logo {
  color: #359381;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: auto;
  margin-bottom: auto;
}

.navigation a {
  text-decoration: none;
  color: #359381;
  padding: 6px 15px;
  border-radius: 20px;
  margin: 0 10px;
  font-weight: 600;
}

.navigation a:hover {
  background: #359381;
  color: #fff;
}


/* fonts */
.title {
  font-family: 'Poppins';
}
.titleBold {
  font-family: 'Poppins';
  font-weight: bold;
}
.subtitle {
  font-family: 'Poppins';
}
.subtitleBold {
  font-family: 'Poppins';
  font-weight: bold;
}
.subtitleItalics {
  font-family: 'Poppins';
  font-style: italic;
}

/* font colours */
.whitefont {
  color: #ffffff;
}
.green1font {
  color: #eef3db;
}
.green2font {
  color: #d2e296;
}
.green3font {
  color: #8a9f53;
}
.green4font {
  color: #748e1e;
}
.green5font {
  color: #2a5717;
}
.green6font{
  color: #41571e;
}
.background{
  background-color: #eef3db;  
}
.heading{
  font-size: 100px;
}
.background-dark-green{
  background-color: #2a5717;
}
.background-green{
  background-color: #8a9f53;
}

  /* disable parallax when seeing in mobile */

  @media (max-width: 600px) {
    html,body
{
    width: 100%;
    height: 100%;
    margin: 0px;
    padding: 0px;
    overflow-x: hidden; 
}
  }

</style>

<script>
export default {
  data() {
    return {
    }
  },
  computed : {
    ...mapStores(useUserStore, useLoadStore, useNotificationStore, useChatStore),
     notificationMap(){
      return {
        "connect" : {
          toastType : "success",
          message : "You can now receive real time notifications!"
        },
        "disconnected" : {
          toastType : "warning",
          message : "You can no longer receive real time notification. Please refresh to reconnect"
        },
        "connect_error" : {
          toastType : "error",
          message : "Failed to connect to server for real time notification. Please try refreshing"
        },
        "message" : {
          toastType : "info",
          message : `${this.chatStore.sender} said ${this.chatStore.textContent}`,
          click : `/chat/${this.chatStore.sender}`
        }, 
         "newChat":{
          toastType : 'info',
          message : `${this.notificationStore.usernameFrom} started a chat with you!`,
          click : `/chat/${this.notificationStore.usernameFrom}`
         },
         "endChatSuccess":{
          toastType : "success",
          message : `${this.notificationStore.usernameFrom} has agreed to close the trade. The chat will now be archived along with the items marked`
         },
         "requestEndChatSuccess" : {
          toastType : "warning", 
          message : `${this.notificationStore.usernameFrom} has requested to close the trade`,
          click : `/chat/${this.notificationStore.usernameFrom}`
         } ,
         "resetEndChatSuccess" : {
          toastType : "warning",
          message :  `${this.notificationStore.usernameFrom} has rejected your request to close the trade`,
          click : `/chat/${this.notificationStore.usernameFrom}`
         },
         "expiredSession" : {
          toastType : "error",
          message : "Your session has expired, please login again"
         }
      }
     }
  },
  methods: {
    printHeight(e){
      console.log(e.target.clientHeight)
    },  
    goRegister(){
      this.$router.replace("/register")
    },
    
  },

  created(){
    // DEALS WITH NOTIFICATION TOAST LOGIC



    this.$watch( ()=> this.notificationStore.time, function (notification) {

      if (this.notificationMap.hasOwnProperty(this.notificationStore.event) && 
      !( this.notificationStore.event == 'message' && this.$route.fullPath.includes(`chat/${this.notificationStore.usernameFrom.sender}`))){
        let options = {}
        if (this.notificationMap[this.notificationStore.event].click){
          var vm = this
          options.onClick = ()=> {vm.$router.push(this.notificationMap[this.notificationStore.event].click)}
        }
        this.$toast[this.notificationMap[this.notificationStore.event].toastType](
        this.notificationMap[this.notificationStore.event].message, options
      )
      }

    })


  }

}
</script>