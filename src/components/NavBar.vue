

<template>

<nav class="navbar navbar-expand-lg navigation p-3" style="width: 100%;" >
  <h2 class="logo titleBold">EcoSwap</h2>
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" >
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup" >
    <div class="navbar-nav" v-show="!userStore.username">
      <router-link  to="/login" class="nav-item nav-link"  >
        Login
      </router-link>
      <router-link   class="nav-item nav-link"  to="/">
        Home
      </router-link>
      <router-link class="nav-item nav-link" to="/marketplace">
        Marketplace  
      </router-link>
      <router-link  class="nav-item nav-link" to="/guest/map">
        Map  
      </router-link>
    </div>
    <div class="navbar-nav" v-show="userStore.username">
      <router-link class="nav-item nav-link" :to="`/user/landing`">
        Home  
      </router-link>
      <router-link class="nav-item nav-link" to="/user/marketplace">
        Marketplace  
      </router-link>
      <router-link class="nav-item nav-link" to="/user/map">
        Map  
      </router-link>
      <router-link class="nav-item nav-link" to="/chat">
        Chat  
      </router-link>
      <button class="btn btn-danger ms-3" @click="logout">
        Logout
      </button>
    </div>
  </div>
</nav>
</template>

<script>

import { useUserStore } from '../store/UserStore';
import { mapStores } from 'pinia';
import * as bootstrap from 'bootstrap';

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
    },
    mounted(){
      
      const navLinks = document.querySelectorAll('.nav-item')
      const menuToggle = document.getElementById('navbarNavAltMarkup')
      const bsCollapse = new bootstrap.Collapse(menuToggle)
      navLinks.forEach((l) => {
          l.addEventListener('click', () => { 
            if(window.innerWidth < 992){
              bsCollapse.toggle()
            }
           })
      })
    }
}

    
</script>