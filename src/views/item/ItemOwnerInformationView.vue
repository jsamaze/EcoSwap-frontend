<script setup>
  //import these to access GLOBAL state variables
  import {RouterLink} from 'vue-router'
  import {mapStores} from 'pinia'
  import { useUserStore } from '../../store/UserStore';
  import { vElementVisibility } from '@vueuse/components'
  import { placeholder, userPlaceholder } from '../../assets/assets'
  import ItemCard from '../../components/ItemCard.vue';
  import GreenBtn from '../../components/GreenBtn.vue';



  // //this is how you import external css files
  // import "../assets/base.css"

</script>

<template>
  <!-- type your HTML here -->
  <div class="container-fluid">
    <div class="row" style="align-items: normal !important;">
      <!-- Left column with profile pic and username, values should be dynamic-->
      <div class='col-lg-4 col-sm-12 text-center pt-5 p-3'>
            <img :src="(user.imageURL && user.imageURL.length) == 0 ? userPlaceholder : user.imageURL" id="imgHere" style="width: 350px; display: flex; margin-left: auto; margin-right: auto;">
            <h1 class="mt-4" id="Username">{{ user.fullName }}</h1>
            <br>
            <h4 id="PreferredBusStop"><span class="titleBold">Preferred Bus Stop:</span> {{busStopCode}} - {{ busStopDesc}} </h4>
            <h4 id="UserRating"><span class="titleBold">User Rating:</span> {{user.avgRating + " out of 5" ?? "-"}}</h4>
            <h4 id="Tier"><span class="titleBold">Tier:</span> <span :style="{color: user.tier}">{{user.tier}}</span></h4>
            
            <div class="d-block">
              <GreenBtn @click="$router.push('/reward')" v-if="userStore.username==$route.params.username">Rewards</GreenBtn>
            </div>
            <div class="d-block">
              <GreenBtn @click="$router.push(`/review/${user.username}`)">Reviews</GreenBtn>
            </div>
            <button class="btn btn-lg btn-success my-3" @click="$router.push('/user/settings')" v-if="userStore.username==$route.params.username">Edit my profile</button>
      </div>

      <!-- Right column with Listed Items and Wishlist Items-->
      <div class="col-8 pt-5 px-5" style="background-color: #cbd5c0;">
        <!--Listed Items-->
        <div class="row mb-3">
          <h2>Listed Items <button type="button" class="btn btn-success btn-md" style="margin-left: 15px;" v-if="userStore.username==$route.params.username" @click="$router.push('/item/add?itemType=Listed')">Add</button> </h2>
          <!-- Card for Listed Items-->
          <div class="container scrolling-wrapper row flex-row flex-nowrap mt-4 pb-4 pt-2">
            <div class="col-md-4 col-6" v-for="itemL in listedItems">
              <ItemCard :item="itemL">

              </ItemCard>
            </div>
          </div>
        </div>

        <!--Wishlist Items-->
        <div class="row mb-3">
          <h2>Wishlist Items  <button type="button" class="btn btn-success btn-md" style="margin-left: 15px;" v-if="userStore.username==user.username" @click="$router.push('/item/add?itemType=WishList')">Add</button></h2>
          <!-- Card for Wishlist Items -->
          <div class="container scrolling-wrapper row flex-row flex-nowrap mt-4 pb-4 pt-2">
            <div class="col-md-4 col-6" v-for="itemW in wishlistItems">
              <ItemCard :item="itemW">

              </ItemCard>
            </div>
          </div>
        </div>

        <!--Favourited Items-->
        <div class="row mb-3" v-if="userStore.username==user.username">
          <h2>Favourited Items</h2>
          <!-- Card for Favourited Items -->
          <div class="container scrolling-wrapper row flex-row flex-nowrap mt-4 pb-4 pt-2">
            <div class="col-md-4 col-6" v-for="itemF in favouritedItems">
              <ItemCard :item="itemF">

              </ItemCard>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style>
/* you can also import css files */
@import '@/assets/homepage.css';
</style>

<script>
export default {

  // this is data, website will reload if this change
  data() {
    return{
      listedItems: [],
      wishlistItems: [],
      user: {}
    }
  },

  methods: {
    test() {
      // you need to use this in the methods
    }
  },

  computed:{
      ...mapStores(useUserStore)
  },


  //any ajax call to start is executed here
  created() {
    console.log(this.userStore.username);
    //this happens when you load website
    //don't forget to use this keyword
    // this is a reference to the backend URL in .env.local file
    var loader = this.$loading.show()

    this.axios.get(`${import.meta.env.VITE_BACKEND}/user/${this.$route.params.username}`).then(response =>{
      this.user = response.data.data
      console.log(this.user)
      this.netPoints = response.data.data.netPoints
      this.accPoints = response.data.data.accumulatedPoints
      this.tier = response.data.data.tier
      this.busStopCode = response.data.data.busStop.BusStopCode
      this.busStopDesc = response.data.data.busStop.Description
      })
      .catch(error=>{
      this.$toast.error("There is an error in fetching user data");
      
      this.$router.go(-1)
    }).finally(
      ()=> {loader.hide()}
    )

    this.axios.get(`${import.meta.env.VITE_BACKEND}/items/search`,{
    params : { 
        itemType : 'Listed', // Listed or WishList (DEFAULT to listed)
        username : this.$route.params.username,
        traded : false,
    }
    }).then(response=>{
      // console.log(response);
      this.listedItems = response.data.data
    })

    this.axios.get(`${import.meta.env.VITE_BACKEND}/items/search`,{
    params : { 
        itemType : 'WishList', // Listed or WishList (DEFAULT to listed)
        username : this.$route.params.username,
    }
    }).then(response=>{
      console.log(response);
      this.wishlistItems = response.data.data
    })


  }
}
</script>
