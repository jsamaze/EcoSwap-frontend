<script setup>
  //import these to access GLOBAL state variables
  import {RouterLink} from 'vue-router'
import ItemCard from '../../components/ItemCard.vue';
  // this is how you import external css files
  // import "../assets/body.css"

  import Vue3TagsInput from 'vue3-tags-input';

</script>

<template>
  <!-- type your HTML here -->

  <!-- search bar + filter -->

  <!-- <nav class="navbar bg-light">
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
  </nav> -->

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
        <input type="submit" class="btn btn-primary" value="Search" @click="search">
      </form>


    </div>

    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-4 col-md-5 col-sm-7" v-for="item in searchResults.slice((page-1)*MAX_PER_PAGE,(page)*MAX_PER_PAGE)">
          <ItemCard :item="item">

          </ItemCard>
        </div>
      </div>
      <div class="row">
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
            <li class="page-item" :class="{disabled: page==1}">
              <a class="page-link"  @click="page-=1">Previous</a>
            </li>
            <li class="page-item" v-for="n in noOfPages"><a class="page-link" :class="{active : n == page}" @click="page = n">{{ n }}</a></li>
            <li class="page-item">
              <a class="page-link" :class="{disabled: page==noOfPages}" @click="page+=1" >Next</a>
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

      <h2>By category</h2>

      <div class="form-check">
        <input class="form-check-input" type="radio" name="category" id="null1" checked v-model="searchFilter.category" :value="null">
        <label class="form-check-label" for="null1">
          No filter applied
        </label>
      </div>
      <div class="form-check" v-for="cat in categories">
        <input class="form-check-input" type="radio" name="category" v-model="searchFilter.category"  :value="cat" :id="cat">
        <label class="form-check-label" :for="cat">
          {{ cat }}
        </label>
      </div>

      <h2>By condition</h2>

      <div class="form-check">
        <input class="form-check-input" type="radio" name="condition" id="null2" checked v-model="searchFilter.condition" :value="null">
        <label class="form-check-label" for="null2">
          No filter applied
        </label>
      </div>

      
      <div class="form-check" v-for="cond in condition">
        <input class="form-check-input" type="radio" name="condition" :id="cond" v-model="searchFilter.condition" :value="cond">
        <label class="form-check-label" :for="cond">
          {{ cond}}
        </label>
      </div>

      <h2>By item type</h2>


      <div class="form-check" v-for="cond in itemType">
        <input class="form-check-input" type="radio" name="itemType" :id="cond" v-model="searchFilter.itemType" :value="cond">
        <label class="form-check-label" :for="cond">
          {{ cond}}
        </label>
      </div>
      <h2>By username</h2>


      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Username</label>
        <input type="email" class="form-control" id="exampleFormControlInput1" v-model="searchFilter.username" placeholder="enter username if you want to filter">
      </div>

      <h2> By trade status</h2>

      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" v-model="searchFilter.traded">
        <label class="form-check-label" for="flexSwitchCheckDefault">Item has been traded</label>
      </div>



      <h2> By tags</h2>

      <vue3-tags-input :tags="searchFilter.tags"
                   placeholder="enter some tags"
                   @on-tags-changed="handleChangeTag"
                   />



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

  watch :{
    searchResults(){
      this.noOfPages = Math.ceil(this.searchResults.length / this.MAX_PER_PAGE)

    }
  },

  // this is data, website will reload if this change
  data() {
    return {
      items : [],
      searchResults : [],
      neverSearch: false,

      page : 1,
      noOfPages : 0,
      MAX_PER_PAGE : 4,

      searchQuery : "",
      searchFilter : {
        category : null,
        condition : null,
        username : "",
        traded : false,
        itemType : "Listed",
        tags: [],
      },

      categories : [
      "Kitchenware",
               "Furniture",
              "Electronics",
              "Fashion"
      ],
      condition : [
        "old", 'new'
      ],
      itemType : [
        'WishList', 'Listed'
      ]

    }
  },

  methods: {

    handleChangeTag(tags) {
      this.searchFilter.tags = tags;
    },
    search(e){
      if (this.searchFilter.tags.length ==0){
        this.searchFilter.tags = null
      } 
      if (this.searchFilter.username.length ==0){
        this.searchFilter.username = null
      } 
      let l = this.$loading.show()
      this.axios.get(`${import.meta.env.VITE_BACKEND}/items/search/${this.searchQuery}`,{
      params : this.searchFilter
    }).then( response => {
      this.searchResults = response.data.data
    }).catch( response => {
      this.$toast.error("Failed to fetch search results")
    }).finally (()=> {
      this.searchFilter = {
        category : null,
        condition : null,
        username : "",
        traded : false,
        itemType : "Listed",
        tags: [],
      },
      l.hide()
      this.neverSearch = false
    })
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