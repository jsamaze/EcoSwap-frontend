<script setup>
  //import these to access GLOBAL state variables
  import {RouterLink} from 'vue-router'
  import ItemCard from '../../components/ItemCard.vue';
  import {mapStores} from 'pinia';
import { useUserStore } from '../../store/UserStore';
import { placeholder } from '../../assets/assets';



  // //this is how you import external css files
  // import "../assets/base.css"

</script>

<template>
  <!-- type your HTML here -->
  <!-- Page only accessible when logged in-->
  <div class="container-fluid">
    <div class="row">
      <!-- Left column with profile pic and username, values should be dynamic-->
      <div class="parent col-3 bg-info">
        <div class="row">
            <img class="big center" :src="user.imageURL && user.imageURL.length == 0 ? placeholder : user.imageURL" id="imgHere">
            <h3 class="center" id="Username">{{ user.fullName }}</h3>
            <p class="center" id="PreferredBusStop">Preferred Bus Stop: {{user.preferredBusStop}}</p>
            <p class="center" id="UserRating">User Rating: {{user.avgRating ?? "NIL"}}</p>
            <p class="center" id="Tier">Tier: <span :style="{color: user.tier}">{{user.tier}}</span></p>
            <button class="btn btn-primary" @click="$router.push('/reward')" v-if="userStore.username==$route.params.username">Points</button>
            <button class="btn btn-primary" @click="$router.push(`/review/${$route.params.username}`)" >See reviews</button>

        </div>
      </div>

      <!-- Right column with Listed Items and Wishlist Items-->
      <div class="col-9">
        <!--Listed Items-->
        <div class="row bg-success mh-50 fit">
          <h5>My Listed Items  <button type="button" class="btn btn-success btn-md" v-if="userStore.username==$route.params.username" @click="$router.push('/item/add?itemType=Listed')">Add</button> </h5>
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
          <h5>My Wishlist Items  <button type="button" class="btn btn-success btn-md" v-if="userStore.username==$route.params.username" @click="$router.push('/item/add?itemType=WishList')">Add</button></h5>
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
</template>

<style scoped>
/* you can also import css files */
main {
  background-color: aqua;
}


.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}

h5{
  padding-top: 10px;
}

.center {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}
.big{
  height: 250px;
  width: 250px;
}

.scrolling-wrapper{
	overflow-x:auto;
}

.card-block{
	height: fit-content;
  width: fit-content;
	background-color: #fff;
	border: none;
	background-position: center;
	background-size: cover;
	transition: all 0.2s ease-in-out !important;
	border-radius: 24px;
}

.card-block:hover{
		transform: translateY(-5px);
    background-color: lightgray;
		box-shadow: none;
		opacity: 0.9;
	}
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
      console.log(response);
      loader.hide();
      this.user = response.data.data
    }).catch(error=>{
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
