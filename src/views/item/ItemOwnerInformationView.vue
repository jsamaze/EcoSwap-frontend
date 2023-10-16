<script setup>
  //import these to access GLOBAL state variables
  import {RouterLink} from 'vue-router'


  // //this is how you import external css files
  // import "../assets/base.css"

</script>

<template>
  <!-- type your HTML here -->
  <!-- Page only accessible when logged in-->
  <div class="container-fluid">
    <div class="row">
      <!-- Left column with profile pic and username, values should be dynamic-->
      <div class="parent col-4 bg-info">
        <div class="row">
            <img class="big center" src="\src\assets\images\scott-lord-PiqZfESKt3k-unsplash.jpg" id="imgHere">
            <h3 class="center" id="otherUsername">Other User's Name</h3>
            <p class="center" id="otherBusStop">Other User's Preferred Bus Stop</p>
            <p class="center" id="otherUserRating">Other User's Rating</p>
        </div>
      </div>

      <!-- Right column with Listed Items and Wishlist Items-->
      <div class="col-8">
        <!--Listed Items-->
        <div class="row bg-success mh-50 fit">
          <h5>Listed Items</h5>
          <br>
          <!-- Card for Listed Items, currently only uses Trending Items-->
          <div class="container scrolling-wrapper row flex-row flex-nowrap mt-4 pb-4 pt-2">
            <div class="col-lg-3" v-for="item in items">
              <div class="card card-block">
                <img src="/src/assets/images/scott-lord-PiqZfESKt3k-unsplash.jpg" class="card-img-top" alt="...">
                <h5 class="card-title subtitle fs-3 mx-3 mt-3">{{ item.itemName }}</h5>
                <p class="card-text subtitle mx-3 mb-3">
                  <span class="subtitleBold">Item category:</span> {{ item.category }}<br>
                  <span class="subtitleBold">Item condition:</span> {{ item.condition }} <br>
                  <span class="subtitleBold">Item tags:</span> {{ item.tags }}<br>
                </p>
              </div>
            </div>
          </div>
        </div>

        <!--Wishlist Items-->
        <div class="row bg-success mh-50">
          <h5>Wishlist Items</h5>
          <br>
          <!-- Card for Wishlist Items, currently only uses Trending Items-->
          <div class="container scrolling-wrapper row flex-row flex-nowrap mt-4 pb-4 pt-2">
            <div class="col-lg-3" v-for="item in items">
              <div class="card card-block">
                <img src="/src/assets/images/scott-lord-PiqZfESKt3k-unsplash.jpg" class="card-img-top" alt="...">
                <h5 class="card-title subtitle fs-3 mx-3 mt-3">{{ item.itemName }}</h5>
                <p class="card-text subtitle mx-3 mb-3">
                  <span class="subtitleBold">Item category:</span> {{ item.category }}<br>
                  <span class="subtitleBold">Item condition:</span> {{ item.condition }} <br>
                  <span class="subtitleBold">Item tags:</span> {{ item.tags }}<br>
                </p>
              </div>
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
      items: []
    }
  },

  methods: {
    test() {
      // you need to use this in the methods
    }
  },


  //any ajax call to start is executed here
  created() {
    //this happens when you load website
    //don't forget to use this keyword
    // this is a reference to the backend URL in .env.local file
    this.axios.get(`${import.meta.env.VITE_BACKEND}/items/popular`).then( response => { 
      console.log(response); 
      this.items= response.data.data;
      }
    ).catch (error => {
    })
  }
}
</script>
