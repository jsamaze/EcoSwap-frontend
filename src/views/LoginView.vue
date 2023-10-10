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
              <h1 class="text-uppercase text-center mb-5 title display-5">Login</h1>

              <form class="mb-0">
                

                <div class="form-floating mb-3">
                  <input type="text" class="form-control" id="floatingInput" v-model="username">
                  <label for="floatingInput">Email address or username</label>
                </div>


                <div class="form-floating mb-3">
                  <input type="password" class="form-control" id="floatingInput" v-model="password">
                  <label for="floatingInput">Password</label>
                </div>
  

            
                <div class="d-flex justify-content-center">
                  <button type="button"
                    class="btn background-dark-green btn-block btn-lg gradient-custom-4 text-white subtitle" @click="login">Login</button>
                </div>

                

                <p class="text-center text-muted mt-5 mb-0 subtitle mb-5">Don't have an account? <a href="#!"
                    class="fw-bold text-body"><u>Register here</u></a></p>

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<style>
/* you can also import css files */
</style>

<script>
export default {

  // this is data, website will reload if this change
  data() {
    return {
      username : null,
      password : null
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
  }
}
</script>