<script setup>
  //import these to access GLOBAL state variables
  import {RouterLink} from 'vue-router'
import ItemCard from '../../components/ItemCard.vue';
  // this is how you import external css files
  // import "../assets/body.css"
</script>

<template>
  <!-- type your HTML here -->

  <!-- search bar + filter -->

  <nav class="navbar bg-light">
    <div class="container-fluid p-3">
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
          <ItemCard :item="item">

          </ItemCard>
        </div>
      </div>
    </div>

    <!-- search bar -->


    <div class="mb-3">

      <form @submit.prevent="search">
        <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
          Filter
        </button>
        <input type="text" class="form-control" placeholder="search for items" v-model="searchQuery">
        <button class="btn btn-primary">Search</button>
      </form>


    </div>

    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-4 col-md-5 col-sm-7" v-for="item in searchResults">
          <ItemCard :item="item">

          </ItemCard>
        </div>
      </div>
      <div class="row">
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
            <li class="page-item disabled">
              <a class="page-link">Previous</a>
            </li>
            <li class="page-item" v-for="n in 5"><a class="page-link" :class="{active : n ==1}" >{{ n }}</a></li>
            <li class="page-item">
              <a class="page-link" >Next</a>
            </li>
          </ul>
       </nav>
      </div>
    </div>


    <!-- offcanvas -->
    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasExampleLabel">Filter search result</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    <div>

      By category

      <div class="form-check">
        <input class="form-check-input" type="radio" name="category" :id="null" checked v-model="searchFilter.category" :value="null">
        <label class="form-check-label" :for="null">
          No filter applied
        </label>
      </div>
      <div class="form-check" v-for="cat in categories">
        <input class="form-check-input" type="radio" name="category" v-model="searchFilter.category"  :value="cat" :id="cat">
        <label class="form-check-label" :for="cat">
          {{ cat }}
        </label>
      </div>

      By condition

      <div class="form-check">
        <input class="form-check-input" type="radio" name="category" :id="null" checked v-model="searchFilter.condition" :value="null">
        <label class="form-check-label" :for="null">
          No filter applied
        </label>
      </div>
      <div class="form-check" v-for="cat in conditions">
        <input class="form-check-input" type="radio" name="category" v-model="searchFilter.condition"  :value="cat" :id="cat">
        <label class="form-check-label" :for="cat">
          {{ cat }}
        </label>
      </div>


      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Filter by username</label>
        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="enter username if you want to filter">
      </div>

      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
        <label class="form-check-label" for="flexSwitchCheckDefault">Item has been traded</label>
      </div>



      By tags



      <!-- body of canvas -->
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
      items : [],
      searchResults : [],

      page : 1,

      searchQuery : null,
      searchFilter : {
        tags : null,
        category : null,
        condition : null,
        username : null,
        traded : null,
      },

      categories : [
      "Kitchenware",
               "Furniture",
              "Electronics",
              "Fashion"
      ]

    }
  },

  methods: {
    search(){
      let l = this.$loading.show()
      this.axios.get(`${import.meta.env.VITE_BACKEND}/items/search/${this.searchQuery}`,{
      params : {
          tags : this.tags, // array of tags
          category : this.category, // Electronics/Fashion/Furniture/Kitchenware
          condition : this.condition, // old new
          itemType : 'Listed', // Listed or WishList (DEFAULT to listed)
          username : this.username,
          traded : this.traded,
          includeOwn : false //IF LOGGED IN choose to exclude self or not
      }
    }).then( response => {
      this.searchResults = response.data.data
    }).catch( response => {
      this.$toast.error("Failed to fetch search results")
    }).finally (()=> l.hide())
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