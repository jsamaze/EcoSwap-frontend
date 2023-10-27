<script setup>
  //import these to access GLOBAL state variables
  import {RouterLink} from 'vue-router'
  import {mapStores} from 'pinia'
  import { useUserStore } from '../store/UserStore';
  // import ReviewView from './ReviewView.vue';
  import { useElementVisibility } from '@vueuse/core'
  import { vElementVisibility } from '@vueuse/components'
  import { placeholder } from '../assets/assets'
  import ItemCard from '../components/ItemCard.vue';

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
    </div>

    <div class="sec container-fluid">
      <div class="row">
        <div class="col">
          <i class="fas fa-star"></i>
          <span class="num" ref="points" @scroll="pointsShow" v-show="accPoints != null" v-element-visibility="onElementVisibility">{{ pointsShown }}</span>
          <h2 class="title whitefont">Points</h2>
          <h3 class="title whitefont"><span :style="{color: user.tier}">{{ tier }}</span> tier</h3>
          <br>
          <button class="btn btn-lg btn-success mb-4" @click="$router.push('/reward')">Redeem rewards!</button>
        </div>
      </div>
    </div>

    <div class="sec2 container-fluid pt-3 ps-4">
      <div class="row">
        <!-- Left column with profile pic and username, values should be dynamic-->
        <div class="parent col-3 bg-info">
          <div class="row">
              <img class="big center" :src="(user.imageURL && user.imageURL.length) == 0 ? placeholder : user.imageURL" id="imgHere">
              <h3 class="center" id="Username">{{ user.fullName }}</h3>
              <p class="center" id="PreferredBusStop">Preferred Bus Stop: {{user.preferredBusStop}}</p>
              <p class="center" id="UserRating">User Rating: {{user.avgRating ?? "-"}}</p>
              <p class="center" id="Tier">Tier: <span :style="{color: user.tier}">{{user.tier}}</span></p>
              <button class="btn btn-primary" @click="$router.push('/reward')" v-if="userStore.username==user.username">Points</button>
              <button class="btn btn-primary" @click="$router.push(`/review/${user.username}`)" >See reviews</button>
              <button class="btn btn-primary" @click="$router.push('/user/settings')" v-if="userStore.username==user.username">Edit my profile</button>

          </div>
        </div>

        <!-- Right column with Listed Items and Wishlist Items-->
        <div class="col-9">
          <!--Listed Items-->
          <div class="row bg-success mh-50 fit">
            <h5>My Listed Items  <button type="button" class="btn btn-success btn-md" v-if="userStore.username==user.username" @click="$router.push('/item/add?itemType=Listed')">Add</button> </h5>
            <br>
            <!-- Card for Listed Items, currently only uses Trending Items-->
            <div class="container scrolling-wrapper row flex-row flex-nowrap mt-4 pb-4 pt-2">
              <div class="col-lg-3" v-for="itemL in listedItems">
                <ItemCard :item="itemL">

                </ItemCard>
              </div>
            </div>
          </div>

          <!--Wishlist Items-->
          <div class="row bg-success mh-50">
            <h5>My Wishlist Items  <button type="button" class="btn btn-success btn-md" v-if="userStore.username==user.username" @click="$router.push('/item/add?itemType=WishList')">Add</button></h5>
            <br>
            <!-- Card for Wishlist Items, currently only uses Trending Items-->
            <div class="container scrolling-wrapper row flex-row flex-nowrap mt-4 pb-4 pt-2">
              <div class="col-lg-3" v-for="itemW in wishlistItems">
                <ItemCard :item="itemW">

                </ItemCard>
              </div>
            </div>
          </div>
        </div>
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

      listedItems: [],
      wishlistItems: [],
      user: {}

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
        response =>{
          this.user = response.data.data
          console.log(this.user)
          this.netPoints = response.data.data.netPoints
          this.accPoints = response.data.data.accumulatedPoints
          this.tier = response.data.data.tier
        }
      ).catch(
        error => {
          console.log(error)
          this.$toast.error('Error with fetching data')
        }
      ).finally(
        () => l.hide()
      )

      this.axios.get(`${import.meta.env.VITE_BACKEND}/items/search`,{
      params : { 
          itemType : 'Listed', // Listed or WishList (DEFAULT to listed)
          username : this.user.username,
          traded : false,
      }
      }).then(response=>{
        this.listedItems = response.data.data
      })

      this.axios.get(`${import.meta.env.VITE_BACKEND}/items/search`,{
      params : { 
          itemType : 'WishList', // Listed or WishList (DEFAULT to listed)
          username : this.userStore.username,
      }
      }).then(response=>{
        console.log(response);
        this.wishlistItems = response.data.data
      })
    }
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