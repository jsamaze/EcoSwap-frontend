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
                            <div class="row">
                                <a href="#" class="btn background-green text-white my-4 subtitle"> Upload Photo</a>
                            </div>
                        </div>
                        <div class="col">
                            <div class="row mt-5">
                                
                                <h1 class="title">Edit Listing</h1>
                                <!-- <span class="badge text-bg-secondary float-end">Listing</span> -->

                                
                            </div>
                            <div class="row">

                                 <div class="mb-3"> 
                                     <label for="name" class="form-label title">Listing Name</label> 
                                     <input type="text" class="form-control" id="name" placeholder=""> 
                                 </div> 
                                
                              
                            
                            </div>
                            <div class="row">

                            <div class="mb-3"> 
                                <label for="exampleFormControlInput1" class="form-label title">Category</label> 
                                <select class="form-select ">
                                <option selected>Kitchenware</option>
                                <option value="1">Furniture</option>
                                <option value="2">Electronics</option>
                                <option value="3">Clothes</option>
                                </select>
                            </div> 
                            <div class="row">

                            <div class="mb-3"> 
                                <label for="exampleFormControlInput1" class="form-label title">Tags</label> 
                                
                            </div> 

                            </div>


                            </div>
                            

                            

                            <div class="row">

                            <div class="mb-3"> 
                                <label for="Desciption" class="form-label title">Desciption</label> 
                                 
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea> 
                               
                                
                    
                            </div> 
                            </div>

                           <br>
                           
                            

                            <div class="row">
                                <a href="#" class="btn background-green text-white my-4 subtitle"> Save</a>
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
  created() {
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