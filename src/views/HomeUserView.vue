<script setup>
  //import these to access GLOBAL state variables
  import {RouterLink} from 'vue-router'
  import GreenBtn from '../components/GreenBtn.vue';
  import {mapStores} from 'pinia'
  import { useUserStore } from '../store/UserStore';
  // import ReviewView from './ReviewView.vue';

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
          <h1 class="titleBold text-center" id="text">Welcome back to<br> EcoSwap, {{userStore.username}}!</h1>
          <img src="../assets/images/plant.png" id="plant">
      </section>

      <div class="sec container-fluid">
        <div class="row">
            <div class="col">
              <i class="fas fa-star"></i>
              <span class="num" data-val="{{ accPoints }}">{{ accPoints }}</span>
              <h3 class="title whitefont">Current points</h3>
              <h3 class="title whitefont">{{ tier }} tier</h3>
              <button class="btn btn-primary" @click="$router.push('/reward')" v-if="userStore.username==$route.params.username">Points</button>
            </div>
        </div>
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
  computed : {
    ...mapStores(useUserStore)
  },
  data() {

    return {
      rewards : [],
      choices : [],
      transactions : [],

      netPoints:0,
      accPoints:0,
      tier:0,
      rewards_rewardName: [],
    }
  },

  methods: {
    async load (){
      try {
        var l = this.$loading.show()
        var ajax1 = await this.axios.get( `${import.meta.env.VITE_BACKEND}/reward`)
        var ajax2 = await this.axios.get( `${import.meta.env.VITE_BACKEND}/reward/transactions`)
        var ajax3 = await this.axios.get(`${import.meta.env.VITE_BACKEND}/user/${this.userStore.username}`)

        this.rewards = ajax1.data.rewards
        this.choices = ajax1.data.choices
        this.transactions = ajax2.data.data

        this.rewards_rewardName = this.rewards.map(e => {
          return e.rewardName
        })

        this.netPoints = ajax3.data.data.netPoints
        this.accPoints = ajax3.data.data.accumulatedPoints
        this.tier = ajax3.data.data.tier

        l.hide()
        

      } catch (error) {
        console.log(error)
        this.$router.push("/")
      }
    },
    redeem(rewardName){
      var load = this.$loading.show()

      this.axios.post(`${import.meta.env.VITE_BACKEND}/reward/${rewardName}/`).then(
        response => {
          this.$toast.success("Success redeeming. Please check your email")
          load.hide()
          this.load()
        }
      ).catch(
        e => {
          console.log(e)
          this.$toast.error("Error: " + e.response.data.problem)
          load.hide()
        }
      )

    }
  },
  //any ajax call to start is executed here
  mounted() {
    this.load()

    // Parallax effect
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
    // Animated number counting
    let valueDisplays = document.getElementsByClassName("num");
    let interval = 500000;

    Array.from(valueDisplays).forEach ;{
      let startValue = 0;
      let endValue = parseInt(valueDisplays.getAttribute("data-val"));
      let duration = Math.floor(interval / endValue);
      let counter = setInterval(function () {
        startValue += 1;
        valueDisplays.textContent = startValue;
        if (startValue == endValue) {
          clearInterval(counter);
        }
      }, duration);
    };
  },
}
</script>