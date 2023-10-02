<script setup>
  //import these to access GLOBAL state variables
  import {RouterLink} from 'vue-router'


  // //this is how you import external css files
  // import "../assets/base.css"

</script>

<template>
  <!-- type your HTML here -->
  <main>


    {{ username }}
    <section class="vh-100 bg-image">
  <div class="mask d-flex align-items-center h-100 gradient-custom-3">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-9 col-lg-7 col-xl-6">
          <div class="card" style="border-radius: 15px;">
            <div class="card-body p-5">
              <h2 class="text-uppercase text-center mb-5">Login</h2>

              <form>
                

                <div class="form-outline mb-4">
                    <label class="form-label" for="username">Username</label>
                  <input v-model="username" type="text" id="username" class="form-control form-control-lg" />
                  
                </div>


                <div class="form-outline mb-4">
                    <label class="form-label" for="form3Example4cg">Password</label>
                  <input v-model="password" type="password" id="form3Example4cg" class="form-control form-control-lg" />
                  
                </div>

  

                

                <div class="d-flex justify-content-center">
                  <button type="button"
                    class="btn btn-success btn-block btn-lg gradient-custom-4 text-body" @click="login">Login</button>
                </div>

                

                <p class="text-center text-muted mt-5 mb-0">Don't have an account? <a href="#!"
                    class="fw-bold text-body"><u>Register here</u></a></p>

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>










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