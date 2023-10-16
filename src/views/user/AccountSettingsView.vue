<script setup>
  //import these to access GLOBAL state variables
import {RouterLink} from 'vue-router'
import TextInput from '../../components/TextInput.vue';
import GreenBtn from '../../components/GreenBtn.vue';
import GreenSubmitBtn from '../../components/GreenSubmitBtn.vue';

  // //this is how you import external css files
  // import "../assets/base.css"

</script>

<template>
  <!-- type your HTML here -->


    <div class="container-fluid ">
      <div class="row background d-flex justify-content-center">
        
        <div class='col d-flex justify-content-center'>
          <div class="white">
            <img class="w-100" :src="src">
            <br>
            <RouterLink to="/user/photo">
              <GreenBtn>
                Change Photo
              </GreenBtn>
            </RouterLink>

        </div>
        <div class='col d-flex justify-content-center'>
          <div class="white p-5">
            <h1 class="title">Account Settings</h1>
            <form @submit.prevent="update">
              
              Username : {{ username }}

              <TextInput v-model="fullName">
                Full Name
              </TextInput>

              <hr>
              
              <TextInput v-model="newEmail">
                Email : {{  oldEmail }}
              </TextInput>

              Your email is {{ emailVerified ? "" : "not " }}verified
              <div v-if="!emailVerified">
                <GreenBtn @click="verifyEmail">Click here to verify email</GreenBtn>
              </div>
              <div>
                if you change your email, you will need to receive OTP
              </div>
              <br>


              <hr>

              <TextInput v-model="prefereedbusstop">
                Preferred Bus Stop
              </TextInput>

              <hr>

              <GreenBtn @click="changePassword">Change Password</GreenBtn>

              <hr> 
               About
              <textarea v-model="about" rows="6" class = "w-100  mb-3 fs-5">

              </textarea>


              <GreenSubmitBtn>
                Confirm changes
              </GreenSubmitBtn>
              </form>
          </div>
          
        </div>
        
      </div>
    </div>
</div>

</template>

<style scoped> 

</style>

<script>
export default {

  // this is data, website will reload if this change
  data() {
    return {
      fullName: "",
      username: "",

      oldEmail: "",
      newEmail:"",
      prefereedbusstop: "",
      about:"",
      src:"",
      emailVerified:false
    }
  },

  methods: {
    update() {
      // you need to use this in the methods

      var data = {
        fullName: this.fullName,
        preferredBusStop: this.prefereedbusstop,
        about: this.about,
      }

      if (this.oldEmail != this.newEmail){
        data.email = this.newEmail
      }

      console.log(JSON.stringify(data))

      var vm = this


      this.axios.patch(`${import.meta.env.VITE_BACKEND}/user`,data).then(
        response =>{
          if (data.email){
            this.$toast.success( "Success! Please check your email for OTP")

            console.log(vm.username)
            this.$router.push({ path: '/otp', query: { username: vm.username } })
          }else {
            this.$toast.success("Success!")

            // this.$router.go(0) //replace later
          }
        }
      ).catch (
        e=>{
          console.log(e)
          this.$toast.error("Fail " + e.response.data.problem )
            // this.$router.go(0) //replace later
        }
      )
    },
    changePassword(){
      this.$router.push("/forgotPassword")
    },
    verifyEmail(){
      this.axios.get(`${import.meta.env.VITE_BACKEND}/user/generateOTP`,{
        params : {
          username : this.username
        }
      }).then(
        response => {
          this.$toast.success( "OTP sent - please check your email")
          this.$router.push({ path: '/otp', query: { username: this.username } })
        }
      ).catch(
        response => {
          this.$toast.error("Error in sending OTP")
          this.email = ''
        }
      )
    }
  },


  //any ajax call to start is executed here
  created() {
    let loader = this.$loading.show({
                });

    //dont forget to use this keyword
                   // this is a reference to the backend URL in .env.local file
    this.axios.get(`${import.meta.env.VITE_BACKEND}/user/joshua`).then( response => {
      // below is all the information taken from response, assigned to this."data"
      console.log(response);
      loader.hide()
      var path = response.data.data;

      this.about = path.about;

      this.oldEmail = path.email;

      this.newEmail = path.email;
      this.emailVerified = path.emailVerified
      this.fullName = path.fullName;
      this.image = path.imageURL;
      this.prefereedbusstop = path.preferredBusStop
      this.username = path.username
      this.src = path.imageURL
      }
    ).catch ( error => {
    })
  }
}
</script>