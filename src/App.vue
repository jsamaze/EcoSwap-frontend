<!-- 3 parts - script, template, style  -->

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from './store/UserStore';
import { mapStores } from 'pinia';
</script>


<template>

<div class="container-fluid px-0">
  <header>
    <h2 class="logo titleBold">EcoSwap</h2>
    <nav class="navigation">
      <span>
        <span v-if="!this.userStore.username">
          <a href="/login" class="active">Guest</a>
        </span>
        <span v-if="this.userStore.username">
          <a href="/user/settings" class="active">Hi, {{ userStore.username }}</a>
        </span>
      </span>
      <span>
        <span v-if="!this.userStore.username">
          <a href="/">Home</a>
        </span>
        <span v-if="this.userStore.username">
          <a href="/user/home">Home</a>
        </span>
      </span>
      <span>
        <span v-if="!this.userStore.username">
          <a href="/marketplace">Marketplace</a>
        </span>
        <span v-if="this.userStore.username">
          <a href="/user/marketplace">Marketplace</a>
        </span>
      </span>
      <span>
        <span v-if="!this.userStore.username">
          <a href="/map">Map</a>
        </span>
        <span v-if="this.userStore.username">
          <a href="/user/map">Map</a>
        </span>
      </span>
    </nav>
  </header>
</div>

  <!-- Replaced by component in /router/index.js -->
  <main >
  <RouterView class="mt-auto"/>
  </main>

  <footer v-if="this.$route.absolutePath=='/chat'" class="background text-center text-lg-start mt-auto">
  <!-- Copyright -->
  <div class="text-center p-3 w-100 subtitle" style="background-color: rgba(0, 0, 0, 0.2);"> © 2023 EcoSwap
  </div>
  </footer>


</template>

<style>
/* put CSS here */

  /* nav bar */
  header {
    background-color: #f7f7f7;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 15px 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    z-index: 100;
  }

  .logo {
    color: #359381;
    pointer-events: none;
    margin-right: 20px;
  }

  .navigation a {
    text-decoration: none;
    color: #359381;
    padding: 6px 15px;
    border-radius: 20px;
    margin: 0 10px;
    font-weight: 600;
  }

  .navigation a:hover,
  .navigation a.active {
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
</style>

<script>
export default {
  data() {
    return {
      // vue things go here
    }
  },
  computed : {
    ...mapStores(useUserStore)
  },
  methods: {
    goRegister(){
      this.$router.replace("/register")
    },
    logout(){
      var loader = this.$loading.show()
      this.axios.get(`${import.meta.env.VITE_BACKEND}/user/logout`).then(
        response=>{
          console.log(response)
          loader.hide()
          this.$router.go(0)
        }
      )
    }
  }
}
</script>