<!-- 3 parts - script, template, style  -->

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from './store/UserStore';
import { mapStores } from 'pinia';
</script>


<template>

<div class="background d-flex flex-column min-vh-100">
  <header>


      <nav class=" navbar navbar-expand-lg  background-green">
      <div class="container-fluid">
    <RouterLink class="  navbar-brand subtitle text-white" to="/">EcoSwap</RouterLink>
    <button class="btn btn-outline-light" type="button">
      <span v-if="!this.userStore.username">
        Guest
      </span>
      <span v-else>
        Hi, {{ userStore.username }}
      </span>
    </button>


    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"   aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav ">
        <a class="nav-item nav-link active subtitle text-white" href="#">Home <span class="sr-only"></span></a>
        <a class="nav-item nav-link subtitle text-white" href="#">Marketplace</a>
        <a class="nav-item nav-link subtitle text-white" href="#">Map</a>



        <span v-if="this.userStore.username">
          <RouterLink class="nav-item nav-link active subtitle text-white" to="/user/settings">Settings</RouterLink>
        </span>


        <button class="btn btn-danger mx-3" v-if="this.userStore.username" @click="logout">
          Logout
        </button>
        <RouterLink to="/register" v-else>
          <div class="d-grid gap-2">
            <button class="btn btn-danger mx-3 btn-blk" >
            Sign In/ Login
            </button>
          </div>

        </RouterLink>



      </div>
    </div>
  </div>
  </nav>


  </header>

  <!-- Replaced by component in /router/index.js -->
  <main >
  <RouterView class="mt-auto"/>
  </main>

  <footer v-if="this.$route.absolutePath=='/chat'" class="background text-center text-lg-start mt-auto">
  <!-- Copyright -->
  <div class="text-center p-3 w-100" style="background-color: rgba(0, 0, 0, 0.2);"> © 2023 EcoSwap
  </div>

  <!-- Copyright -->
</footer>


</div>
</template>

<style>
/* put CSS here */




  .title {
    font-family: 'Libre Bodoni';
  }
  .titleBold {
    font-family: 'Libre Bodoni';
    font-weight: bold;
  }
  .titleItalics {
    font-family: 'Libre Bodoni';
    font-style: italic;
  }
  .subtitle {
    font-family: 'Spectral';
  }
  .subtitleBold {
    font-family: 'Spectral';
    font-weight: bold;
  }
  .subtitleItalics {
    font-family: 'Spectral';
    font-style: italic;
  }
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