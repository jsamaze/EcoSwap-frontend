<script setup>
  //import these to access GLOBAL state variables
  import {RouterLink} from 'vue-router'
  import GreenBtn from '../components/GreenBtn.vue';
  import {mapStores} from 'pinia'
  import { useUserStore } from '../store/UserStore';
  import ReviewView from './ReviewView.vue';

</script>

<template>
  
  <!-- type your HTML here -->
  <main>
    <div class="container-fluid bg px-0 mt-0">
      <section class="parallax z-1">
          <img src="../assets/images/hill1.png" id="hill1">
          <img src="../assets/images/hill2.png" id="hill2">
          <img src="../assets/images/hill3.png" id="hill3">
          <img src="../assets/images/hill4.png" id="hill4">
          <img src="../assets/images/hill5.png" id="hill5">
          <img src="../assets/images/tree.png" id="tree">
          <img src="../assets/images/leaf.png" id="leaf">
          <h1 class="titleBold text-center" id="text">Welcome to<br> EcoSwap, {{userStore.username}}!
            <!-- sign up button -->
            <RouterLink to="/register" style="display: block; text-decoration: none;">
              <GreenBtn class="button title">Sign Up Now!</GreenBtn>
            </RouterLink>
          </h1>
          <img src="../assets/images/plant.png" id="plant">
      </section>

      <div class="sec container-fluid">
        
      </div>

      <div class="sec2 container-fluid">
      
      </div>

    </div>
  </main>
</template>

<style>
/* you can also import css files */
@import "../assets/homepage.css"

</style>

<script>

export default {

  // this is data, website will reload if this change
  data() {
    return {
    }
  },

  computed :{
    ...mapStores(useUserStore)
  },

  methods: {
    test() {
      // you need to use this in the methods
    }
  },


  //any ajax call to start is executed here
  mounted() {
    //this happens when u load website
    // dont forget to put the word this

    //dont forget to use this keyword
    // this is a reference to the backend URL in .env.local file
        let text = document.getElementById('text');
        let leaf = document.getElementById('leaf');
        let hill1 = document.getElementById('hill1');
        let hill4 = document.getElementById('hill4');
        let hill5 = document.getElementById('hill5');

        window.addEventListener('scroll', () => {
            let value = window.scrollY;

            leaf.style.top = Math.min(value * -1.5, leaf.height) + 'px';
            leaf.style.left = value * 1.5 + 'px';
            hill5.style.left = value * 1.5 + 'px';
            hill4.style.left = value * -1.5 + 'px';
            hill1.style.top = Math.min(value * 1,hill1.height) + 'px';
        });
  }
}
</script>