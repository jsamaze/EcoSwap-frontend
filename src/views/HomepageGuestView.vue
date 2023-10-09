<script setup>
  //import these to access GLOBAL state variables
  import {RouterLink} from 'vue-router'


  // //this is how you import external css files
  // import "../assets/base.css"

</script>

<template>
  
  <!-- type your HTML here -->
  <main>
    <div class="container-fluid bg">

      <!-- heading -->
      <div class="row">
        <div class="col-2">
        </div>
        <div class="col">


          <div class="jumbotron jumbotron-fluid">
            <div class="container">
              <h1 class="heading display-4 title text-center mb-3 mt-5 pt-5 ">Start your eco-journey with EcoSwap today!</h1>
            </div>
          </div>
  
        </div>

        <div class="col-2">
        </div>
      </div>

      <!-- button -->
      <div class="row">
        <div class="col text-center mb-5">
          <button type="button" class="btn background-dark-green text-white mt-4 mb-3">SIGN UP NOW</button>
        </div>
      </div>


      <!-- users have saved part -->
      <div class="row text-center p-5">
        
        <h1 class="title">Our users have saved...</h1>
        
      </div>
      <!-- users  part-->
      <div class="row text-center">
        <div class="col">

        </div>

        <div class="col">
         
          <p class="subtitle">25%</p>
          <p class="subtitle">of land in Semakau Landfill</p>
        </div>

        <div class="col">
          <p class="subtitle">75%</p>
          <p class="subtitle">of money spent on electronics</p>
        </div>

        <div class="col">
          <p class="subtitle">75%</p>
          <p class="subtitle">of water saved from clothes fabrication</p>
        </div>

        <div class="col">
          
        </div>

      </div>

      <!-- about -->
      <div class="row text-center p-5">
        <h1 class="title">About EcoSwap</h1>
      </div>

      <!-- missions -->
      <div class="row">
        <div class="col-2">

        </div>

        <div class="col-10">
          <h5 class="subtitle">
          OUR MISSIONS
        </h5>
        <p class="subtitle">Do you know what helps you make your point clear?</p>
        <h5 class="subtitle">OUR GOALS</h5>
        <ul class="subtitle">
          <li>first</li>
          <li>first</li>
          <li>first</li>
        </ul>
        <h5 class="subtitle">HOW WE ACHIEVE THEM</h5>
        <p class="subtitle">And the most important thing: the audience won’t miss the point of your presentation</p>
        </div>
        
      </div>

      <!-- praises from user -->
      <div class="row text-center p-5">
        <h1 class="title">Praises from our users…</h1>
      </div>

      <div class="row ">
        <div class="col-2">
        </div>
        <div class="col-10">
          <h5 class="subtitle">User123</h5>
        <p class="subtitle">Mercury is the closest planet to the Sun and the smallest one of them all</p>
        </div>  
      </div>

      <div class="row">
        <div class="col-2">
        </div>
        <div class="col-10">
          <h5 class="subtitle">User456</h5>
        <p class="subtitle">Mercury is the closest planet to the Sun and the smallest one of them all</p>
        </div>  
      </div>

      <div class="row">
        <div class="col-2">
        </div>
        <div class="col-10">
          <h5 class="subtitle">User789</h5>
        <p class="subtitle">Mercury is the closest planet to the Sun and the smallest one of them all</p>
        </div>  
      </div>



    </div>







  <!-- use this to access data -->
    {{ name  }}
  <!-- link to another page as if using a tag-->
    <RouterLink to="/home">lmao</RouterLink>

  </main>
</template>

<style>
/* you can also import css files */
.bg{
  background-color: #eef3db
;
}
</style>

<script>

export default {

  // this is data, website will reload if this change
  data() {
    return {
      name : "joshua"
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
    //this happens when u load website
    // dont forget to put the word this

    //dont forget to use this keyword
                   // this is a reference to the backend URL in .env.local file
    this.axios.get(`${import.meta.env.VITE_BACKEND}/user/joshua`).then( response => {
      }
    ).catch ( error => {
    })
  }
}
</script>