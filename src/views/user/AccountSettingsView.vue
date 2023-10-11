<script setup>
  //import these to access GLOBAL state variables
  import {RouterLink} from 'vue-router'
import TextInput from '../../components/TextInput.vue';
import GreenBtn from '../../components/GreenBtn.vue';
import bsModal from 'bootstrap/js/src/modal'
import GreenSubmitBtn from '../../components/GreenSubmitBtn.vue';
import Modal from '../../components/Modal.vue'

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
              
              <TextInput v-model="newEmail">
                Email : {{  oldEmail }}
              </TextInput>
              if you change your email, you will need to receive OTP
              <br>

              <TextInput v-model="prefereedbusstop">
                Preferred Bus Stop
              </TextInput>
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
<Modal>
{{ msg }}
</Modal>
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

      msg:null,

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
            this.msg= "Success! Please check your email for OTP"
            const myModal= new bsModal('#myModal')
            myModal.show()
            console.log(vm.username)
            this.$router.push({ path: '/otp', query: { username: vm.username } })
          }else {
            this.msg= "Success!"
            const myModal= new bsModal('#myModal')
            myModal.show()
            // this.$router.go(0) //replace later
          }
        }
      ).catch (
        e=>{
          this.msg= "Fail!"
            const myModal= new bsModal('#myModal')
            myModal.show()
            // this.$router.go(0) //replace later
        }
      )
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

      this.oldEmail = path.email;

      this.newEmail = path.email;

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