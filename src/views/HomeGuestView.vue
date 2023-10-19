<script setup>
  //import these to access GLOBAL state variables
  import {RouterLink} from 'vue-router'
import GreenBtn from '../components/GreenBtn.vue';


  // this is how you import external css files
  import "../assets/homepage.css"

</script>

<template>
  
  <!-- type your HTML here -->
  <main>
    <div class="container-fluid bg px-0">

    <section class="parallax">
        <img src="../assets/images/hill1.png" id="hill1">
        <img src="../assets/images/hill2.png" id="hill2">
        <img src="../assets/images/hill3.png" id="hill3">
        <img src="../assets/images/hill4.png" id="hill4">
        <img src="../assets/images/hill5.png" id="hill5">
        <img src="../assets/images/tree.png" id="tree">
        <img src="../assets/images/leaf.png" id="leaf">
        <span class="titleBold text-center" id="text">Start your journey<br>with EcoSwap today!
          <!-- sign up button -->
          <RouterLink to="/register">
            <GreenBtn class="button title">Sign Up Now!</GreenBtn>
          </RouterLink>
        </span>
        <img src="../assets/images/plant.png" id="plant">
    </section>

    <section class="secFill">
    </section>

    <section class="sec">
        
        <!-- users have saved part -->
        <div class="row text-center p-5">
          
          <h1 class="title whitefont">Our users have saved...</h1>
          
        </div>
        <!-- users  part-->
        <div class="row text-center">

          <div class="col-4">
          
            <p class="subtitle">25%</p>
            <p class="subtitle">of land in Semakau Landfill</p>
          </div>

          <div class="col-4">
            <p class="subtitle">75%</p>
            <p class="subtitle">of money spent on electronics</p>
          </div>

          <div class="col-4">
            <p class="subtitle">75%</p>
            <p class="subtitle">of water saved from clothes fabrication</p>
          </div>

        </div>
        
    </section>

    <section class="sec2">
      <!-- about -->
      <div class="row text-center p-5">
        <h1 class="title">About EcoSwap</h1>
      </div>
      <!-- missions -->
      <div class="row">
        <div class="col-2">
        </div>
        <div class="col-10">
          <h5 class="subtitle">
          OUR MISSIONS
        </h5>
        <p class="subtitle">Do you know what helps you make your point clear?</p>
        <h5 class="subtitle">OUR GOALS</h5>
        <ul class="subtitle">
          <li>first</li>
          <li>first</li>
          <li>first</li>
        </ul>
        <h5 class="subtitle">HOW WE ACHIEVE THEM</h5>
        <p class="subtitle">And the most important thing: the audience won’t miss the point of your presentation</p>
        </div>
      
      </div>
      <!-- praises from user -->
      <div class="row text-center p-5">
        <h1 class="title">Praises from our users…</h1>
      </div>
      <div class="row ">
        <div class="col-2">
        </div>
        <div class="col-10">
          <h5 class="subtitle">User123</h5>
        <p class="subtitle">Mercury is the closest planet to the Sun and the smallest one of them all</p>
        </div>
      </div>
      <div class="row">
        <div class="col-2">
        </div>
        <div class="col-10">
          <h5 class="subtitle">User456</h5>
        <p class="subtitle">Mercury is the closest planet to the Sun and the smallest one of them all</p>
        </div>
      </div>
      <div class="row">
        <div class="col-2">
        </div>
        <div class="col-10">
          <h5 class="subtitle">User789</h5>
        <p class="subtitle">Mercury is the closest planet to the Sun and the smallest one of them all</p>
        </div>
      </div>
    </section>

    </div>
  </main>
</template>

<style>
/* you can also import css files */
.bg{
  background-color: #eef3db
;
}
.button{
  text-decoration: none;
}
</style>

<script>

export default {

  // this is data, website will reload if this change
  data() {
    return {
      name : "joshua"
    }
  },

  methods: {
    test() {
      // you need to use this in the methods
      this.name =jakob
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

            text.style.marginTop = value * 2.5, text.height + 'px';
            leaf.style.top = Math.min(value * -1.5, leaf.height) + 'px';
            leaf.style.left = value * 1.5 + 'px';
            hill5.style.left = value * 1.5 + 'px';
            hill4.style.left = value * -1.5 + 'px';
            hill1.style.top = Math.min(value * 1,hill1.height) + 'px';
        });
  }
}
</script>