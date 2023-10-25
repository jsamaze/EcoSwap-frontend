

<template>

<nav class="navbar navbar-expand-lg navigation p-3" style="width: 100%;" >
  <h2 class="logo titleBold">EcoSwap</h2>
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" >
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav" v-if="!userStore.username">
      <router-link  to="/login" class="nav-item nav-link">Login</router-link>
      <router-link   class="nav-item nav-link"  to="/">Home</router-link>
      <router-link class="nav-item nav-link" to="/marketplace">Marketplace</router-link>
      <router-link  class="nav-item nav-link" to="/guest/map">Map</router-link>
    </div>
    <div class="navbar-nav" v-if="userStore.username">
      <router-link  class="nav-item nav-link" to="/user/settings" >Hi, {{ userStore.username }}</router-link>
      <router-link class="nav-item nav-link" :to="`/user/${userStore.username}`">Home</router-link>
      <router-link class="nav-item nav-link" to="/user/marketplace">Marketplace</router-link>
      <router-link class="nav-item nav-link" to="/user/map">Map</router-link>
      <router-link class="nav-item nav-link" to="/chat">Chat</router-link>
      <button class="btn btn-danger mx-3" @click="logout" >
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