<!-- 3 parts - script, template, style  -->

<script setup>
import { RouterView } from 'vue-router'
import { useUserStore } from './store/UserStore';
import { mapStores } from 'pinia';
import { useLoadStore } from './store/InitialLoadStore';
import Loading from 'vue-loading-overlay'
import NavBar from './components/NavBar.vue';
import { useNotificationStore } from './store/NotificationStore';
</script>


<template>

  <!-- this is to load the page initially -->
    <div class="vl-parent">
        <loading v-model:active="loadStore.loading"
          loader="bars"/>
    </div>



    <div class="d-flex flex-column min-vh-100 background">
  <header>

    <NavBar ></NavBar>


<div style="height: 60px; background-color: #f7f7f7;;">
  I am here to avoid item hiding behind nav bar
</div>

  </header>

  <!-- Replaced by component in /router/index.js -->
  <main class="" >
  <RouterView class="mt-auto pt-3"/>
  </main>

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
    /* max-height: 10vh; */
    /* position: fixed;  */
    /* top: 0;
    left: 0; */
    /* width: 100%;
    padding: 15px 50px; */
    /* display: flex; */
    /* justify-content: flex-start; */
    /* align-items: center;
    z-index: 100; */
  }

  .logo ,h2 {
    color: #359381;
    /* pointer-events: none;
    margin-right: 20px; */


  }

  h2:hover {
    color : white;
  }


  .navigation a,  .active-class {
    text-decoration: none;
    color: #359381;
    padding: 6px 15px;
    border-radius: 20px;
    margin: 0 10px;
    font-weight: 600;
  }

  .navigation a:hover,
  .navigation a .active,  .active-class {
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

  /* font size */
  .text-responsive {
    font-size: calc(100% + 1vw + 1vh);
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
    html,body:not(.parallax)
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
      notificationMap : {
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
        }
      }
    }
  },
  computed : {
    ...mapStores(useUserStore, useLoadStore, useNotificationStore)
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
      this.$toast[this.notificationMap[this.notificationStore.event].toastType](
        this.notificationMap[this.notificationStore.event].message
      )
    })


  }

}
</script>