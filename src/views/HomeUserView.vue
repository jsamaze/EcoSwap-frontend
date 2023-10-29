<script setup>
  //import these to access GLOBAL state variables
  import {RouterLink} from 'vue-router'
  import {mapStores} from 'pinia'
  import { useUserStore } from '../store/UserStore';
  import { vElementVisibility } from '@vueuse/components'
  import { placeholder, userPlaceholder } from '../assets/assets'
  import ItemCard from '../components/ItemCard.vue';
  import GreenBtn from '../components/GreenBtn.vue';

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
          <br>
          <button class="btn btn-lg btn-success mb-5" @click="$router.push('/reward')">Redeem rewards!</button>
        </div>
      </div>
    </div>

    <div class="container-fluid">
      <div class="row" style="align-items: normal !important;">
        <!-- Left column with profile pic and username, values should be dynamic-->
        <div class='col-md-4 col-sm-12 text-center pt-5 p-3'>
              <img :src="(user.imageURL && user.imageURL.length) == 0 ? userPlaceholder : user.imageURL" id="imgHere" style="width: 350px; display: flex; margin-left: auto; margin-right: auto;">
              <h1 class="mt-4" id="Username">{{ user.fullName }}</h1>
              <h5 class="mt-4" id="Username">{{ !user.about ? "No description" : user.about }}</h5>
              <br>
              <h4 id="PreferredBusStop"><span class="titleBold">Preferred Bus Stop:</span> {{busStopCode}} - {{ busStopDesc}} </h4>
              <h4 id="UserRating"><span class="titleBold">User Rating:</span> {{!user.avgRating ? "no reviews yet" : user.avgRating+ " out of 5" ?? "-"}}</h4>


              <h4 id="Tier"><span class="titleBold">Tier:</span> <span :class="REWARD_TIER[user.tier].cssColor">{{user.tier}}</span></h4>
              
              <div class="d-block">
                <GreenBtn @click="$router.push('/reward')" v-if="userStore.username==user.username">Rewards</GreenBtn>
              </div>
              <div class="d-block">
                <GreenBtn @click="$router.push(`/review/${user.username}`)">Reviews</GreenBtn>
              </div>
              <button class="btn btn-lg btn-success my-3" @click="$router.push('/user/settings')" v-if="userStore.username==user.username">Edit my profile</button>
        </div>

        <!-- Right column with Listed Items and Wishlist Items-->
        <div class="col-md-8 pt-5 px-5" style="background-color: #cbd5c0;">
          <!--Listed Items-->
          <div class="row mb-5">
            <h2 class="ms-3 mb-3">My Listed Items <button type="button" class="btn btn-success btn-md" style="margin-left: 15px;" v-if="userStore.username==user.username" @click="$router.push('/item/add?itemType=Listed')">Add</button> </h2>
            <!-- Card for Listed Items-->
            <div class="row flex-nowrap overflow-auto justify-content-start">
              <div class="col-xl-3 col-md-5 col-sm-6 col-7" v-for="itemL in listedItems">
                <ItemCard :item="itemL">

                </ItemCard>
              </div>
            </div>
            <div class="row text-center fs-3" v-if="listedItems.length == 0" :style="{'minHeight': '50vh'}">
              No items to show
            </div>
          </div>

          <!--Wishlist Items-->
          <div class="row mb-5">
            <h2 class="ms-3 mb-3">My Wishlist Items  <button type="button" class="btn btn-success btn-md" style="margin-left: 15px;" v-if="userStore.username==user.username" @click="$router.push('/item/add?itemType=WishList')">Add</button></h2>
            <!-- Card for Wishlist Items -->
            <div class="row flex-nowrap overflow-auto justify-content-start">
              <div class="col-xl-3 col-md-5 col-sm-6 col-7" v-for="itemW in wishlistItems">
                <ItemCard :item="itemW">

                </ItemCard>
              </div>
            </div>
            <div class="row text-center fs-3" v-if="wishlistItems.length == 0" :style="{'minHeight': '50vh'}">
            No items to show
          </div>
          </div>

          <!--Favourited Items-->
          <div class="row mb-5">
            <h2 class="ms-3 mb-3">My Favourited Items</h2>
            <!-- Card for Favourited Items -->
            <div class="row flex-nowrap overflow-auto justify-content-start">
              <div class="col-xl-3 col-md-5 col-sm-6 col-7" v-for="itemF in favouritedItems">
                <ItemCard :item="itemF">

                </ItemCard>
              </div>
            </div>
            <div class="row text-center fs-3" v-if="favouritedItems.length == 0" :style="{'minHeight': '50vh'}">
            No items to show
          </div>
          </div>

        </div>
      </div>
    </div>
    
  </main>
</template>


<style>
@import '@/assets/homepage.css';

.rainbow {
  font-weight: bold;
  background: linear-gradient(to right, #ef5350, #f48fb1, #7e57c2, #2196f3, #26c6da, #43a047, #eeff41, #f9a825, #ff5722);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

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
      favouritedItems: [],
      busStopCode:null,
      busStopDesc:null,
      about:null,
      user: {tier:'Superstar'},

      REWARD_TIER : {
        Green : {
          cssColor : 'text-success',
          range : 100,
          start : 0,
          end : 100,
        },
        Silver : {
          cssColor : 'text-secondary',
          range : 200,
          start : 100,
          end : 300,
        },
        Gold : {
          cssColor : 'text-warning',
          range : 200,
          start : 300,

          end : 500,
        },
        Superstar : {
          cssColor : 'rainbow',
          start : 500,
          range: 100, // just here to prevent error
          end : 600,
        }
      }

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
        this.pointsShown=0
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
    
    async load() {
    var loader = this.$loading.show()

    console.log(this.userStore.username);
    try {

      let response = await this.axios.get(`${import.meta.env.VITE_BACKEND}/user/${this.userStore.username}`)

      this.user = response.data.data
      console.log(this.user)
      this.description = response.data.data.about
      this.netPoints = response.data.data.netPoints
      this.accPoints = response.data.data.accumulatedPoints
      this.tier = response.data.data.tier
      this.busStopCode = response.data.data.busStop?.BusStopCode ?? ""
      this.busStopDesc = response.data.data.busStop?.Description ?? ""

      response = await this.axios.get(`${import.meta.env.VITE_BACKEND}/items/search`,{
    params : { 
        itemType : 'Listed', // Listed or WishList (DEFAULT to listed)
        username : this.userStore.username,
        traded : false,
    }
    })

    this.listedItems = response.data.data

    response = await this.axios.get(`${import.meta.env.VITE_BACKEND}/items/search`,{
    params : { 
        itemType : 'Listed', // Listed or WishList (DEFAULT to listed)
        username : this.userStore.username,
        traded : true,
    }
    })

    this.listedItems = [...this.listedItems, ...response.data.data]


    response = await this.axios.get(`${import.meta.env.VITE_BACKEND}/items/search`,{
    params : { 
        itemType : 'WishList', // Listed or WishList (DEFAULT to listed)
        username : this.userStore.username,
    }
    })



    this.wishlistItems = response.data.data

    response = await this.axios.get(`${import.meta.env.VITE_BACKEND}/items/liked`)

    this.favouritedItems = response.data.data

    } catch (e){
      this.$toast.error("There is an error in fetching user data");
      console.log(e)
      // this.$router.go(-1)
    } finally {
      loader.hide()
    }
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