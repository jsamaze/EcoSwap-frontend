<script setup>
  //import these to access GLOBAL state variables
  import {RouterLink} from 'vue-router'

  // this is how you import external css files
  // import "../assets/body.css"
</script>

<template>
  <!-- type your HTML here -->

  <!-- search bar + filter -->

  <nav class="navbar bg-light sticky-top">
    <div class="container-fluid">
      <form class="d-flex" role="search">
        <input class="form-control me-2 title" type="search" placeholder="Search for..." aria-label="Search">
        <button class="btn btn-outline-success titleBold" type="submit">Search</button>
      </form>
      <div class="dropdown align-self-start">
      <button class="nav-item btn dropdown-toggle titleBold" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        Filter
      </button>
      <ul class="dropdown-menu">
        <li class="titleBold">Categories</li>
        <div class="btn-group" role="group" aria-label="Basic checkbox toggle button group">
          <input type="checkbox" class="btn-check" id="btncheck1" autocomplete="off">
          <label class="btn btn-outline-primary" for="btncheck1">Checkbox 1</label>

          <input type="checkbox" class="btn-check" id="btncheck2" autocomplete="off">
          <label class="btn btn-outline-primary" for="btncheck2">Checkbox 2</label>

          <input type="checkbox" class="btn-check" id="btncheck3" autocomplete="off">
          <label class="btn btn-outline-primary" for="btncheck3">Checkbox 3</label>
        </div>
        <li class="titleBold">Tags</li>
        <li class="dropdown-item subtitle">Action</li>
        <li class="dropdown-item subtitle">Action</li>
        <li class="dropdown-item subtitle">Action</li>
      </ul>
    </div>
    </div>
  </nav>

  <!-- promotion carousel -->
  <main>
    <div id="marketplaceCarousel" class="container-fluid carousel slide" data-bs-ride="carousel">
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


    <!-- trending horizontal scroll -->

    <div class="container-fluid">
      <h1 class="titleBold mt-5">Trending</h1>
      <div class="container-fluid scrolling-wrapper row flex-row flex-nowrap mt-4 pb-4 pt-2">
        <div class="col-lg-4 col-md-5 col-sm-7" v-for="item in items">
          <div class="card card-block">
            <img src="/src/assets/images/scott-lord-PiqZfESKt3k-unsplash.jpg" class="card-img-top" alt="...">
            <h5 class="card-title subtitle fs-3 mx-3 mt-3">{{ item.itemName }}</h5>
            <p class="card-text subtitle mx-3 mb-3">
              <span class="subtitleBold">Item category:</span> {{ item.category }}<br>
              <span class="subtitleBold">Item condition:</span> {{ item.condition }} <br>
              <span class="subtitleBold">Item tags:</span> {{ item.tags }}<br>
              <span>Views {{ item.views }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>


    <!-- recommended for you carousel -->
    
    <div class="container-fluid">
      <h1 class="titleBold mt-5">Recommended for you</h1>
      <div class="container-fluid scrolling-wrapper row flex-row flex-nowrap mt-4 pb-4 pt-2">
        <div class="col-lg-4 col-md-5 col-sm-7" v-for="item in items">
          <div class="card card-block">
            <img src="/src/assets/images/scott-lord-uX1QIBXbkMA-unsplash.jpg" class="card-img-top" alt="...">
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
      this.items= response.data.data;
      }
    ).catch ( error => {
    })
  }
}
</script>