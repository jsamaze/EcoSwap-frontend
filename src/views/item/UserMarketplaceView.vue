<script setup>
  //import these to access GLOBAL state variables
  import {RouterLink} from 'vue-router'
import ItemCard from '../../components/ItemCard.vue';
  // this is how you import external css files
  // import "../assets/body.css"

  import Vue3TagsInput from 'vue3-tags-input';

</script>

<template>
  <!-- promotion carousel -->
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

    <div class="container-fluid">

      <div class="row text-center">
        <h1 class="titleBold">Search</h1>
      </div>

      <div class="row justify-content-center">
        <div class="col-11 align-self-center">
          <form @submit.prevent="search">

<div class="input-group bg-white">



  <input type="text" class="form-control" placeholder="Search for items" v-model="searchQuery">

  <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-filter" viewBox="0 0 16 16">
      <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
    </svg>
      </button>
      <div class="dropdown-menu dropdown-menu-end p-3">
      <h6>By category</h6>

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

      <div class="dropdown-divider"></div>

      <h6>By condition</h6>

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

      <div class="dropdown-divider"></div>

      <h6>By item type</h6>


      <div class="form-check" v-for="cond in itemType">
        <input class="form-check-input" type="radio" name="itemType" :id="cond" v-model="searchFilter.itemType" :value="cond">
        <label class="form-check-label" :for="cond">
          {{ cond}}
        </label>
      </div>

      <div class="dropdown-divider"></div>

      <h6>By username</h6>


      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Username</label>
        <input type="email" class="form-control" id="exampleFormControlInput1" v-model="searchFilter.username" placeholder="enter 1 username to filter with">
      </div>

      <div class="dropdown-divider"></div>

      <h6> By trade status</h6>

      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" v-model="searchFilter.traded">
        <label class="form-check-label" for="flexSwitchCheckDefault">Item has {{ searchFilter.traded ? "" : "NOT" }} been traded</label>
      </div>

      <div class="dropdown-divider"></div>

      <h6> By tags</h6>

      <vue3-tags-input :tags="searchFilter.tags"
          placeholder="enter some tags"
          @on-tags-changed="handleChangeTag"
          />
          </div>


            <button class="btn btn-outline-secondary" type="button" @click="search">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
            </button>
          </div>
          </form>
        </div>
      </div>

      <div class="row fs-3" v-if="searchResults.length ==0" style="height:110vh">
          <div class="m-auto text-center">
            {{ neverSearch ? "Start searching for items" : "No items found" }}
          </div> 
      </div>


      <div class="row mx-5" style="min-height:110vh" v-if="searchResults.length > 0">
          <div class="col-3 p-3" v-for="item in searchResults.slice((page-1)*MAX_PER_PAGE,(page)*MAX_PER_PAGE)">
            <ItemCard :item="item" :key="item._id">

            </ItemCard>
          </div>
      </div>


      <div class="row" v-if="searchResults.length > 0">
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

    






</template>

<style>

.row {
    display: flex;
    align-items: center;
    justify-content: center;
}
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
      this.noOfPages = Math.max(Math.ceil(this.searchResults.length / this.MAX_PER_PAGE),0)

    }
  },

  // this is data, website will reload if this change
  data() {
    return {
      items : [],
      searchResults : [],
      neverSearch: true,

      page : 1,
      noOfPages : 0,
      MAX_PER_PAGE : 8,

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

      var sf = {...this.searchFilter}
      if (this.searchFilter.tags.length ==0){
        sf.tags = null
      } 
      if (this.searchFilter.username.length ==0){
        sf.username = null
      } 

      let vm = this
      let l = this.$loading.show()
      this.axios.get(`${import.meta.env.VITE_BACKEND}/items/search/${this.searchQuery}`,{
      params : sf
          }).then( response => {
            vm.searchResults = response.data.data
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
            }
            l.hide()
            this.page=1
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