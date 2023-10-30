<script setup>
  //import these to access GLOBAL state variables
  import {RouterLink} from 'vue-router'
import ItemCard from '../../components/ItemCard.vue';
  // this is how you import external css files
  // import "../assets/body.css"

  import Vue3TagsInput from 'vue3-tags-input';
import MiddleCardForListing from '../../components/MiddleCardForListing.vue';

</script>

<template>
  <!-- promotion carousel -->
    <div id="marketplaceCarousel" class="container-fluid carousel slide p-0" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="/src/assets/images/1.png" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="/src/assets/images/2.png" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="/src/assets/images/3.png" class="d-block w-100" alt="...">
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

    <div class="container-fluid text-center" >
      <span style="display: inline;">
        <h1 class="titleBold mt-5" style="font-size: xxx-large; display: inline-block; margin-right: 15px;">Trending</h1>
        <!-- modal start -->
        <!-- Button trigger modal -->
        <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" style="border: 0; background-color: #eef3db;">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="black" class="bi bi-question-circle" viewBox="0 0 16 16" style="vertical-align:bottom;">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
          </svg>
        </button>
      </span>
      <div class="row mx-3 my-5 overflow-auto flex-nowrap justify-content-start">
        <div class="col-xl-2 col-md-3 col-sm-5 col-6" v-for="item in items">
          <ItemCard :item="item">

          </ItemCard>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Welcome to the marketplace!</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div>
              <p>See what other users are interested in! Browse through the trending items!</p>
              <img src="/src/assets/images/UMarketplace_modal1.gif">
              <br>
              <br>
              <p>Have an item in mind? Try searching by item name, or use the filters to narrow your search!</p>
              <img src="/src/assets/images/UMarketplace_modal2.gif">
              <img>
            </div>
          </div>
          <div class="modal-footer">
            <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> -->
          </div>
        </div>
      </div>
    </div>

      <!-- modal end -->

    <!-- search bar -->

      <div class="container-fluid">

<div class="row text-center">
  <h1 class="titleBold my-4" style="font-size: xxx-large">Search</h1>
</div>

<div class="row justify-content-center">
  <div class="col-11 align-self-center">
    <form @submit.prevent="search">

<div class="input-group bg-white">



<input type="text" class="form-control" placeholder="Search by item name" v-model="searchQuery" style="border: 1px solid black;">

<button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-filter" viewBox="0 0 16 16">
<path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
</svg>
</button>
<div class="dropdown-menu dropdown-menu-end p-3">
<h6>Categories</h6>

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

<h6>Conditions</h6>

<div class="form-check">
  <input class="form-check-input" type="radio" name="condition" id="null2" checked v-model="searchFilter.condition" :value="null">
  <label class="form-check-label" for="null2">
    No filter applied
  </label>
</div>


<div class="form-check" v-for="cond in condition">
  <input class="form-check-input" type="radio" name="condition" :id="cond" v-model="searchFilter.condition" :value="cond">
  <label class="form-check-label text-capitalize" :for="cond">
    {{ cond}}
  </label>
</div>

<div class="dropdown-divider"></div>

<h6>Item types</h6>


<div class="form-check" v-for="cond in itemType">
  <input class="form-check-input" type="radio" name="itemType" :id="cond" v-model="searchFilter.itemType" :value="cond">
  <label class="form-check-label" :for="cond">
    {{ cond}}
  </label>
</div>

<div class="dropdown-divider"></div>

<h6>Trade status</h6>

<div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" v-model="searchFilter.traded">
  <label class="form-check-label" for="flexSwitchCheckDefault">{{ searchFilter.traded ? "Traded" : "NOT traded" }}</label>
</div>

<div class="dropdown-divider"></div>

<h6>Search by...</h6>


<div class="mb-3">
  <input type="email" class="form-control" id="exampleFormControlInput1" v-model="searchFilter.username" placeholder="Username">
</div>

<vue3-tags-input :tags="searchFilter.tags"
    placeholder=" Tags"
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


<div class="row container-fluid flex-row m-0 pt-4" style="min-height:110vh" v-if="searchResults.length > 0">
    <div class="col-lg-3 col-md-4 col-sm-6 col-6 mb-4" v-for="item in searchResults.slice((page-1)*MAX_PER_PAGE,(page)*MAX_PER_PAGE)">
      <ItemCard :item="item" :key="item._id">

      </ItemCard>
    </div>
</div>


<div class="row" v-if="searchResults.length > 0">
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{disabled: page==1}">
        <a class="page-link"  @click="page-=1">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
          </svg>
        </a>
      </li>

      <li class="page-item" :class="{disabled: page==1}">
        <a class="page-link"  @click="page=1">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-rewind" viewBox="0 0 16 16">
            <path d="M9.196 8 15 4.633v6.734L9.196 8Zm-.792-.696a.802.802 0 0 0 0 1.392l6.363 3.692c.52.302 1.233-.043 1.233-.696V4.308c0-.653-.713-.998-1.233-.696L8.404 7.304Z"/>
            <path d="M1.196 8 7 4.633v6.734L1.196 8Zm-.792-.696a.802.802 0 0 0 0 1.392l6.363 3.692c.52.302 1.233-.043 1.233-.696V4.308c0-.653-.713-.998-1.233-.696L.404 7.304Z"/>
          </svg>
        </a>
      </li>





      <li class="page-item" v-for="n in shownPages" ><a class="page-link" :class="{active : n==page}" @click="page=n">{{ n }}</a></li>





      <!-- <li class="page-item" v-for="n in noOfPages"><a class="page-link" :class="{active : n == page}" @click="page = n">{{ n }}</a></li> -->
      <li class="page-item" :class="{disabled: page==noOfPages}">
        <a class="page-link"  @click="page=noOfPages">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-fast-forward" viewBox="0 0 16 16">
            <path d="M6.804 8 1 4.633v6.734L6.804 8Zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C.713 12.69 0 12.345 0 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692Z"/>
            <path d="M14.804 8 9 4.633v6.734L14.804 8Zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C8.713 12.69 8 12.345 8 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692Z"/>
          </svg>
        </a>
      </li>
      
      
      <li class="page-item">
        <a class="page-link" :class="{disabled: page==noOfPages}" @click="page+=1" >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
          </svg>
        </a>
      </li>
    </ul>
 </nav>
 <div class="row text-center">
  Total {{ noOfPages }} page{{ noOfPages > 1 ? "s" : "" }}
 </div>
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


  // this is data, website will reload if this change
  data() {
    return {
      items : [],
      searchResults : [],
      neverSearch: true,

      page : 1,
      noOfPages : 0,
      MAX_PER_PAGE : 8,
      shownPages : [],

      searchQuery : "",
      searchFilter : {
        category : null,
        condition : null,
        username : "",
        traded : false,
        itemType : "Listed",
        tags: [],
        includeOwn : false,
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

  watch:{
    page(){
      var arr=[]
      if (this.page < 4 ){
        let end = Math.min(6, this.noOfPages+1)
        console.log('end :>> ', end);
        for(var i = 1; i < end ; i++){
          arr.push(i)
        }
        this.shownPages = arr      
      } else if (this.page >= this.noOfPages-2){
        for(var i = this.noOfPages-4; i < this.noOfPages+1; i++){
          arr.push(i)
        }
        this.shownPages = arr
      } else {
        for(var i = this.page-2; i < this.page+3; i++){
          arr.push(i)
        }
        this.shownPages = arr
      }

    },
    searchResults(){
      this.noOfPages = Math.max(Math.ceil(this.searchResults.length / this.MAX_PER_PAGE),0)

    },
    noOfPages(){

      let arr=[]
      let end = Math.min(6, this.noOfPages+1)
        console.log('end :>> ', end);
        for(var i = 1; i < end ; i++){
          arr.push(i)
        }
        this.shownPages= arr
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
              includeOwn : false
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
    this.axios.get(`${import.meta.env.VITE_BACKEND}/items/popular`,
    {
      // withCredentials : false //let's limit to first 10
    }).then( response => { 
      this.items= response.data.data;
      }
    ).catch ( error => {
    })
  }
}
</script>