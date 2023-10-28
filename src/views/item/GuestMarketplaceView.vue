<script setup>
  //import these to access GLOBAL state variables
  import {RouterLink} from 'vue-router'
import ItemCard from '../../components/ItemCard.vue';

  // this is how you import external css files
  // import "../assets/body.css"
</script>

<template>
  <!-- type your HTML here -->

  <!-- promotion carousel -->
  <main>
    <div id="marketplaceCarousel" class="container-fluid carousel slide p-0" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="/src/assets/images/sergey-pesterev-JV78PVf3gGI-unsplash.jpg" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="/src/assets/images/sergey-pesterev-JV78PVf3gGI-unsplash.jpg" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="/src/assets/images/sergey-pesterev-JV78PVf3gGI-unsplash.jpg" class="d-block w-100" alt="...">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#marketplaceCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#marketplaceCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>


    <!-- trending section -->

    <div class="container-fluid p-0">
      <h1 class="titleBold my-5 text-center" style="font-size: xxx-large;">Trending</h1>
      <div class="row container-fluid flex-row m-0">
        <div class="col-lg-3 col-md-4 col-sm-6 col-6 mb-4" v-for="item in items">
          <ItemCard :item="item">

          </ItemCard>
        </div>
      </div>
    </div>


  </main>
</template>

<style>
/* you can also import css files */
#marketplaceCarousel {
  height: auto;
  margin: 0rem;
  overflow: hidden;
}

.scrolling-wrapper{
	overflow-x: auto;
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
    background-color: #d2e296;
		box-shadow: none;
		opacity: 0.9;
	}
</style>

<script>

export default {

  // this is data, website will reload if this change
  data() {
    return {
      items : []
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
    ).catch ( error => {
    })
  }
}
</script>