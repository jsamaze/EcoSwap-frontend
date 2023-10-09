<script setup>
  //import these to access GLOBAL state variables
  import {RouterLink} from 'vue-router'


  // //this is how you import external css files
  // import "../assets/base.css"

</script>

<template>
  <!-- type your HTML here -->
  <main>


    <section class="vh-100 bg-image background">
  <div class="mask d-flex align-items-center h-100 gradient-custom-3">
    <div class="container h-100 pb-5">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-9 col-lg-7 col-xl-6">
          <div class="card" style="border-radius: 15px;">
            <div class="card-body p-5">
              <h1 class=" text-center mb-5 title display-5">Forgot Password?</h1>

              <form>
                

                <div class="form-outline mb-4">
                    <h5 class="form-label subtitle" for="username">Email</h5>
                  <input v-model="username" type="text" id="username" class="form-control form-control-lg" />
                  
                </div> 

                <div class="d-flex justify-content-center">
                  <button type="button"
                    class="btn background-dark-green btn-block btn-lg gradient-custom-4 text-white subtitle" @click="login">Confirm</button>
                </div>

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<!-- Modal -->
<div class="modal fade background" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5 title text-center p-4" id="exampleModalLabel">An OTP has been sent to your email address.</h1>
        
      </div>
      
      <div class="modal-footer text-center justify-content-center">
        <button type="button" class="btn background-dark-green title text-white" data-bs-dismiss="modal">Close</button>
        
      </div>
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