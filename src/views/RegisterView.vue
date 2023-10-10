<script setup>
  //import these to access GLOBAL state variables
  import {RouterLink} from 'vue-router'


  // //this is how you import external css files
  // import "../assets/base.css"

</script>

<template>
  <!-- type your HTML here -->

  <div class="container">
      <div class="row  justify-content-center align-items-center ">
        <div class="col-12 col-md-9 col-lg-7 col-xl-6">
          <div class="card w-100 m-3 pb-0 h-auto" style="border-radius: 15px;">
            <div class="card-body p-5 pb-0 h-50">

              <h2 class="text-uppercase text-center mb-5 display-6 title ">Registration</h2>

              <form>
                

                <div class="form-outline mb-4">
                    <label class="form-label subtitle" for="form3Example1cg">Username</label>
                  <input type="text" id="form3Example1cg" class="form-control form-control-lg" />
                  
                </div>


                <label class="form-label subtitle" for="form3Example3cg">Full Name</label>
                <div class="form-outline mb-4">
                  <input type="text" id="fullname" class="form-control form-control-lg" />
                  
                </div>

                
                <label class="form-label subtitle" for="form3Example3cg">Email</label>
                <div class="form-outline mb-4">
                  <input type="email" id="form3Example3cg" class="form-control form-control-lg" />
                  
                </div>

                <div class="form-outline mb-4">
                    <label class="form-label subtitle" for="form3Example4cg">Password</label>
                  <input type="password" id="form3Example4cg" class="form-control form-control-lg" />
                  
                </div>

                <div class="form-outline mb-4">
                    <label class="form-label subtitle" for="form3Example4cdg">Confirm password</label>
                  <input type="password" id="form3Example4cdg" class="form-control form-control-lg" />
                
                </div>

                   

                <br>

                <div class="form-check d-flex justify-content-center mb-5">
                  <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" />
                  <label class="form-check-label subtitle" for="form2Example3g">
                    I agree all statements in <a href="#!" class="text-body"><u>Terms of service</u></a>
                  </label>
                </div>

                <div class="d-flex justify-content-center">
                  <button type="button"
                    class="btn background-dark-green btn-block btn-lg gradient-custom-4 text-white subtitle">Register</button>
                </div>

                <p class="text-center text-muted mt-5 mb-3 subtitle">Have already an account? <a href="#!"
                    class="fw-bold text-body"><u>Login here</u></a></p>

              </form>

          </div>
        </div>
      </div>
    </div>
  </div>


</template>


<style>
.hi{
  height: 900px;
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