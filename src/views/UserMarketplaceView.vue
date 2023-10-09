<script setup>
  //import these to access GLOBAL state variables
  import {RouterLink} from 'vue-router'

  // this is how you import external css files
  // import "../assets/body.css"
</script>

<template>
  <!-- type your HTML here -->

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
          <img src="src/assets/images/david-becker-OK91o9WcZgQ-unsplash.jpg" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="src/assets/images/david-becker-OK91o9WcZgQ-unsplash.jpg" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="src/assets/images/david-becker-OK91o9WcZgQ-unsplash.jpg" class="d-block w-100" alt="...">
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

    <!-- trending items carousel -->
    <div class="container-fluid pt-4 ">
    <p class="title fs-1">Trending</p>
    </div>

    <div id="carouselExampleIndicators" class="container-fluid carousel slide">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>

      <div class="container-fluid carousel-inner">
        <div class="row container-fluid align-items-center">

          <div class="col" v-for="item in items">
            <div class="carousel-item active">
              <div class="card" style="width: 18rem;">
                <img src="src/assets/images/david-becker-OK91o9WcZgQ-unsplash.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title fs-3 subtitle">{{ item.itemName }}</h5>
                  <p class="card-text subtitle">
                    Item category: {{ item.category }}<br>
                    Item condition: {{ item.condition }} <br>
                    Item tags: {{ item.tags }}<br>
                  </p>
                  <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>

    </div>

    <div class="container-fluid">
    <h1 class="mt-5">Bootstrap 4 Horizontal Scrolling</h1>
		<p class="subtitle">Horizontal scrolling without CSS. Just copy scrolling wrapper classes</p>
    <div class="scrolling-wrapper row flex-row flex-nowrap mt-4 pb-4 pt-2">
			<div class="col-5" v-for="item in items">
				<div class="card" style="width: 18rem;">
        <img src="src/assets/images/david-becker-OK91o9WcZgQ-unsplash.jpg" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title fs-3 subtitle">{{ item.itemName }}</h5>
          <p class="card-text subtitle">
            Item category: {{ item.category }}<br>
            Item condition: {{ item.condition }} <br>
            Item tags: {{ item.tags }}<br>
          </p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
        </div>
      </div>
    </div>
    </div>

    <!-- recommended for you carousel -->
    <div class="container-fluid pt-4 ">
    <p class="title fs-1">Recommended for you</p>
    </div>

    <div id="carouselExampleIndicators" class="container-fluid carousel slide">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>

      <div class="container-fluid carousel-inner">
        <div class="row container-fluid align-items-center">

          <div class="col">
            <div class="carousel-item active">
              <div class="card" style="width: 18rem;">
                <img src="src/assets/images/david-becker-OK91o9WcZgQ-unsplash.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title fs-3 subtitle">Item Name</h5>
                  <p class="card-text subtitle">
                    Item category: <br>
                    Item condition: <br>
                    Item tags: <br>
                  </p>
                  <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
              </div>
            </div>
          </div>
        
          <div class="container-fluid col">
            <div class="carousel-item active">
              <div class="card" style="width: 18rem;">
                <img src="src/assets/images/david-becker-OK91o9WcZgQ-unsplash.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title fs-3 subtitle">Item name</h5>
                  <p class="card-text subtitle">
                    Item category: <br>
                    Item condition: <br>
                    Item tags: <br>
                  </p>
                  <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
              </div>
            </div>
          </div>

          <div class="container-fluid col">
            <div class="carousel-item active">
              <div class="card" style="width: 18rem;">
                <img src="src/assets/images/david-becker-OK91o9WcZgQ-unsplash.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title fs-3 subtitle">Item name</h5>
                  <p class="card-text subtitle">
                    Item category: <br>
                    Item condition: <br>
                    Item tags: <br>
                  </p>
                  <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>

    </div>



  </main>
</template>

<style>
/* you can also import css files */
#marketplaceCarousel {
  height: 450px;
  margin: 0rem;
  overflow: hidden;
}
.scrolling-wrapper{
	overflow-x: auto;
}

.card-block{
	height: 300px;
	background-color: #fff;
	border: none;
	background-position: center;
	background-size: cover;
	transition: all 0.2s ease-in-out !important;
	border-radius: 24px;
}

.card-block:hover{
		transform: translateY(-5px);
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
      this.name =jakob
    }
  },


  //any ajax call to start is executed here
  mounted() {
    //this happens when you load website
    //don't forget to use this keyword

    // this is a reference to the backend URL in .env.local file
    this.axios.get(`${import.meta.env.VITE_BACKEND}/items/popular`).then( response => { console.log(response); this.items= response.data.data;
      }
    ).catch ( error => {
    })
  }
}
</script>