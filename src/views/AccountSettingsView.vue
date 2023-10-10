<script setup>
  //import these to access GLOBAL state variables
  import {RouterLink} from 'vue-router'


  // //this is how you import external css files
  // import "../assets/base.css"

</script>

<template>
  <!-- type your HTML here -->
  <main>


    <div class="container-fluid ">
      <div class="row background d-flex justify-content-center">
        
        <div class='col d-flex justify-content-center'>
          <div class="white">
            PUT THE PHOTO THING HERE
            <br>
            <div class="d-flex justify-content-center">
                  <button type="button"
                    class="btn background-dark-green btn-block btn-lg gradient-custom-4 text-white subtitle" @click="login">Upload Photo</button>
                </div>
          </div>
        </div>
        <div class='col d-flex justify-content-center'>
          <div class="white p-5">
            <h1 class="title">Account Settings</h1>
            <form>
                

                <div class="form-outline mb-4">
                    <h5 class="form-label subtitle" for="username">Username</h5>
                  <input v-model="username" type="text" id="username" class="form-control form-control-lg" />
                  
                </div>


                <div class="form-outline mb-4">
                    <h5 class="form-label subtitle" for="form3Example4cg">Email</h5>
                  <input v-model="email" type="text" id="form3Example4cg" class="form-control form-control-lg" />
                  
                </div>

                <div class="form-outline mb-4">
                    <h5 class="form-label subtitle" for="form3Example4cg">Preferred Bus Stop</h5>
                  <input v-model="prefereedbusstop" type="text" id="form3Example4cg" class="form-control form-control-lg" />
                  
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

  </main>
</template>

<style scoped> 

</style>

<script>
export default {

  // this is data, website will reload if this change
  data() {
    return {
      fullname: "",
      username: "",
      eamil: "",
      prefereedbusstop: ""
    }
  },

  methods: {
    test() {
      // you need to use this in the methods
    }
  },


  //any ajax call to start is executed here
  mounted() {

    //dont forget to use this keyword
                   // this is a reference to the backend URL in .env.local file
    this.axios.get(`${import.meta.env.VITE_BACKEND}/user/joshua`).then( response => {
      // below is all the information taken from response, assigned to this."data"
      console.log(response);
      var path = response.data.data;
      this.about = path.about;
      this.email = path.email;
      this.fullname = path.fullName;
      this.image = path.imageURL;
      this.prefereedbusstop = path.preferredBusStop
      this.username = path.username
      }
    ).catch ( error => {
    })
  }
}
</script>