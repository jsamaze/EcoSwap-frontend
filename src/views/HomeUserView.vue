<script setup>
  //import these to access GLOBAL state variables
  import {RouterLink} from 'vue-router'
  import {mapStores} from 'pinia'
  import { useUserStore } from '../store/UserStore';
  // import ReviewView from './ReviewView.vue';
  import { useElementVisibility } from '@vueuse/core'
  import { vElementVisibility } from '@vueuse/components'
</script>

<template>
  
  <!-- type your HTML here -->
  <main @scroll="handleScroll">
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
              <span class="num" ref="points" @scroll="pointsShow" v-show="accPoints != null" v-element-visibility="onElementVisibility">{{ pointsShown }}</span>
              <h3 class="title whitefont">Accumulated points</h3>
              <h3 class="title whitefont">{{ tier }} tier</h3>
              <button class="btn btn-primary" @click="$router.push('/reward')">Points</button>
            </div>
        </div>
      </div>

      <div class="sec2 container-fluid">
        
      </div>

    </div>
  </main>
</template>


<style>
@import '@/assets/homepage.css';
</style>
/* you can also import css files */

<script>
const fn =  () => {
        let value = window.scrollY;

        leaf.style.top = Math.min(value * -1.5, leaf.height) + 'px';
        leaf.style.left = value * 1.5 + 'px';
        hill5.style.left = value * 1.5 + 'px';
        hill4.style.left = value * -1.5 + 'px';
        hill1.style.top = Math.min(value * 1,hill1.height) + 'px';
    }

export default {
  // this is data, website will reload if this change
  data() {

    return {
      rewards : [],
      choices : [],
      transactions : [],

      netPoints:0,
      accPoints:null,
      tier:null,
      rewards_rewardName: [],

      pointsShown:0,
      pointsVisible : false,
      counter :null,

      controller : null,
      signal : null,

    }
  },



  watch:{
    $route (to, from){
      window.removeEventListener('scroll', this.handleScroll);
    }
  } ,


  computed : {
    ...mapStores(useUserStore)
  },

  methods: {

    onElementVisibility(state){
      if(!this.pointsVisible && state){
        // this.pointsShown=0
        var vm = this
          this.counter = setInterval(function () {
            if (vm.pointsShown >= vm.accPoints) {
              clearInterval(vm.counter);
            } else {
              vm.pointsShown += 1;
            }
          }, 1000/this.accPoints);

      }
    },
    
     load (){
        var l = this.$loading.show()
        
        this.axios.get(`${import.meta.env.VITE_BACKEND}/user/${this.userStore.username}`).then(
          ajax3 =>{
            console.log(ajax3.data.data.accumulatedPoints)

            this.netPoints = ajax3.data.data.netPoints
            this.accPoints = ajax3.data.data.accumulatedPoints
            // console.log(this.accPoints, "AP")
            this.tier = ajax3.data.data.tier
          }
        ).catch(
          error => {
            console.log(error)
            this.$toast.error('Error with fetching data')
          }
        ).finally(
          () => l.hide()
        )
    },

  },
  beforeRouteLeave(){
    window.removeEventListener('scroll', fn);
  },

  //any ajax call to start is executed here
  mounted() {
    this.load()
    console.log("mount")
    // Parallax effect
    let leaf = document.getElementById('leaf');
    let hill1 = document.getElementById('hill1');
    let hill4 = document.getElementById('hill4');
    let hill5 = document.getElementById('hill5');

    window.addEventListener('scroll', fn);
  }
}
</script>