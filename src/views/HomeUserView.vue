<script setup>
  //import these to access GLOBAL state variables
  import {RouterLink} from 'vue-router'
import GreenBtn from '../components/GreenBtn.vue';

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
          <h1 class="titleBold text-center" id="text">Welcome back to<br>EcoSwap {username}!</h1>
          <img src="../assets/images/plant.png" id="plant">
      </section>

      <div class="sec">
          
          <!-- users have saved part -->
          <div class="row p-5">
            <h1 class="titleBold whitefont">Our users have saved...</h1>
          </div>
          
          <!-- users  part-->
          <section class="circles" style="display: flex;">
            <div class="circle" data-prog="25">
              <svg width="250" height="250">
                <circle r="100" cx="125" cy="125" class="track"></circle>
                <circle r="100" cx="125" cy="125" class="progress"></circle>
              </svg>
              <div class="circle-inner">
                <h1>25%</h1>
              </div>
            </div>
            <div class="circle" data-prog="70">
              <svg width="250" height="250">
                <circle r="100" cx="125" cy="125" class="track"></circle>
                <circle r="100" cx="125" cy="125" class="progress"></circle>
              </svg>
              <div class="circle-inner">
                <h1>70%</h1>
              </div>
            </div>
            <div class="circle" data-prog="75">
              <svg width="250" height="250">
                <circle r="100" cx="125" cy="125" class="track"></circle>
                <circle r="100" cx="125" cy="125" class="progress"></circle>
              </svg>
              <div class="circle-inner">
                <h1>75%</h1>
              </div>
            </div>
            <div class="circle" data-prog="63">
              <svg width="250" height="250">
                <circle r="100" cx="125" cy="125" class="track"></circle>
                <circle r="100" cx="125" cy="125" class="progress"></circle>
              </svg>
              <div class="circle-inner">
                <h1>63%</h1>
              </div>
            </div>
          </section>
        </div>

      <div class="sec2 container-fluid">
        <!-- about -->
        <div class="row text-center">
          <h1 class="titleBold">About EcoSwap</h1>
        </div>
        <!-- missions -->
        <div class="row">
          <div class="col-1">
          </div>
          <div class="col">
            <h5 class="subtitleBold">OUR MISSION</h5>
            <p class="subtitle">Ecoswap's mission is to empower individuals and communities to reduce waste, promote sustainability, and foster a sense of shared responsibility for our planet by creating a global platform for swapping used items.</p>
            <h5 class="subtitleBold">OUR GOALS</h5>
            <ul class="subtitle">
              <li>We aim to significantly reduce the environmental impact of discarded items by facilitating their reuse, ultimately diverting tons of waste from landfills and incineration.</li>
              <li>We strive to raise awareness about the importance of sustainable living and conscious consumption. Our goal is to make sustainability accessible to everyone.</li>
              <li>We seek to build a global community of like-minded individuals who believe in the power of sharing and supporting one another in making eco-friendly choices.</li>
            </ul>
            <h5 class="subtitleBold">HOW WE ACHIEVE THEM</h5>
            <p class="subtitle">We provide an easy-to-use online platform and mobile app where users can list and find a wide range of used items for swapping.</p>
          </div>
          <div class="col-1">
          </div>
        </div>
        <!-- praises from user -->
        
        <div class="row text-center p-5 ">
          <h1 class="title subtitleBold">Praises from our users…</h1>
        </div>
        <div class="row ">
          <div class="col-1">
          </div>
          <div class="col">
            <h5 class="subtitle subtitleBold">Alyssa Soh</h5>
            <p class="subtitle">"Ecoswap has completely changed the way I think about shopping. I've been able to find so many great items while reducing my environmental footprint. Thank you for making sustainability so accessible!"</p>
          </div>
          <div class="col-1">
          </div>
        </div>
        <div class="row">
          <div class="col-1">
          </div>
          <div class="col">
            <h5 class="subtitle subtitleBold">Brandon Low</h5>
            <p class="subtitle">"Ecoswap isn't just a platform; it's a community that cares about our planet. I've made new friends and learned so much about living more sustainably. It's like a family!"</p>
          </div>
          <div class="col-1">
          </div>
        </div>
        <div class="row">
          <div class="col-1">
          </div>
          <div class="col">
            <h5 class="subtitle subtitleBold">Amanda Tay</h5>
            <p class="subtitle">"I can't thank Ecoswap enough for helping me save money. As a single parent, it's been a financial lifeline. Swapping items I no longer need for things I do has been a game-changer."</p>
          </div>
          <div class="col-1">
          </div>
        </div>
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