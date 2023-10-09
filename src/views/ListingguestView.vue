<script setup>
  //import these to access GLOBAL state variables
  import {RouterLink} from 'vue-router'


  // //this is how you import external css files
  // import "../assets/base.css"

</script>

<template>
  <!-- type your HTML here -->
  <main>


    <div class="container-fluid">
        <div class="row background">

            <div class="col">
                <!-- card -->
                <div class="card w-75 m-auto my-5  ">
                <div class="card-body  ">
                    
                    <a href="#" class="btn background-dark-green text-white"> Back</a>
                    <div class="row">
                        <div class="col">
                            <!-- carousel -->
                            <div id="marketplaceCarousel" class="container-fluid carousel slide mt-5" data-bs-ride="carousel">
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

                            <!-- end carousel -->
                        </div>
                        <div class="col">
                            <div class="row mt-5">
                                
                                <h1 class="title">Rice Cooker</h1>
                                <!-- <span class="badge text-bg-secondary float-end">Listing</span> -->

                                
                            </div>
                            <div class="row">
                                <span class="subtitle">
                                <span class="subtitle">Category:</span>
                                Kitchenware</span>
                            </div>
                            <div class="row">
                                <span class="subtitle">
                                <span class="subtitle">Condition:</span>
                                Old</span>
                            </div>
                            <div class="row">
                                <span class="subtitle">
                                <span class="subtitle">Tags:</span>
                                kitchen, essentials</span>
                            </div>

                            <br>

                            <div class="row">
                                <p class="subtitle">
                                <span class="subtitle">Desciption:</span>
                                Giving away a rice cooker purchased 10 years ago. 2L capacity. Limited edition design</p>
                            </div>

                            <br>
                            <div class="row">
                                <p class="subtitle">                       
                                <span class="subtitle">Desciption:</span>
                                Giving away a rice cooker purchased 10 years ago. 2L capacity. Limited edition design</p>
                            </div>
                            <br>
                            <div class="row">
                                
                                <h6 class="title">Listed by</h6>
                            </div>

                            <div class="row">
                                <div class="col-2">
                                    picture
                                </div>

                                <div class="col-10">
                                    <h6 class="subtitle">ABC</h6>
                                    <h6 class="subtitle">Preferred bus stop: 04151</h6>
                                    <h6 class="subtitle">50m away</h6>

                                </div>
                                
                            </div>
                            

                            <div class="row">
                                <a href="#" class="btn background-green text-white my-4"> Start Chat!</a>
                            </div>
                            
                            
                            



                        </div>
                    </div>
                </div>
                </div>
                <!-- card end -->
            </div>
        </div>
    </div>









 

  </main>
</template>

<style>
/* you can also import css files */
.card{
    width: 700px;
    height: 700px;
}
.bold{
    font-weight: bold;
}
</style>

<script>
export default {

  // this is data, website will reload if this change
  data() {
    return {
      username : "",
      password : ""
    }
  },

  methods: {
    login() {
      // you need to use this in the methods
      this.axios.post(`${import.meta.env.VITE_BACKEND}/user/login`,{
        username: this.username, 
        password: this.password
      }). then((response)=>{
        console.log(response)
        this.$router.push(`/home`)
      }).catch((error)=>{
        console.log(error)
      })
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