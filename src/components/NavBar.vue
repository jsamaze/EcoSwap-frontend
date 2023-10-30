

<template>

<nav class="navbar navbar-expand-lg navigation p-3" style="width: 100%;" >
  <h2 class="logo titleBold">EcoSwap</h2>
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" >
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav" v-if="!userStore.username">
      <router-link  to="/login" class="nav-item nav-link"  >
        <span data-bs-target="#navbarNavAltMarkup" data-bs-toggle="collapse">Login</span>
      </router-link>
      <router-link   class="nav-item nav-link"  to="/">
        <span data-bs-target="#navbarNavAltMarkup" data-bs-toggle="collapse">Home</span>  
      </router-link>
      <router-link class="nav-item nav-link" to="/marketplace">
        <span data-bs-target="#navbarNavAltMarkup" data-bs-toggle="collapse">Marketplace</span>  
      </router-link>
      <router-link  class="nav-item nav-link" to="/guest/map">
        <span data-bs-target="#navbarNavAltMarkup" data-bs-toggle="collapse">Map</span>  
      </router-link>
    </div>
    <div class="navbar-nav" v-if="userStore.username">
      <router-link class="nav-item nav-link" :to="`/user/landing`">
        <span data-bs-target="#navbarNavAltMarkup" data-bs-toggle="collapse">Home</span>  
      </router-link>
      <router-link class="nav-item nav-link" to="/user/marketplace">
        <span data-bs-target="#navbarNavAltMarkup" data-bs-toggle="collapse">Marketplace</span>  
      </router-link>
      <router-link class="nav-item nav-link" to="/user/map">
        <span data-bs-target="#navbarNavAltMarkup" data-bs-toggle="collapse">Map</span>  
      </router-link>
      <router-link class="nav-item nav-link" to="/chat">
        <span data-bs-target="#navbarNavAltMarkup" data-bs-toggle="collapse">Chat</span>  
      </router-link>
      <button class="btn btn-danger ms-3" @click="logout" data-bs-target="#navbarNavAltMarkup" data-bs-toggle="collapse">
        Logout
      </button>
    </div>
  </div>
</nav>
</template>

<script>

import { useUserStore } from '../store/UserStore';
import { mapStores } from 'pinia';

export default {
    computed: {
        ...mapStores(useUserStore)
    },
    methods : {
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