<script setup>
  import {RouterLink} from 'vue-router'
  import MiddleCol from '../../components/MiddleCol.vue';
  import TextInput from '../../components/TextInput.vue';
  import GreenSubmitBtn from '../../components/GreenSubmitBtn.vue'

</script>

<template>
  <!-- type your HTML here -->

  <MiddleCol>
    <form @submit.prevent="register">
      <h1 class="text-uppercase text-center  title display-5" >Register</h1>

                
      <TextInput type="text" v-model="username" required="true">
        Username
      </TextInput>

      <TextInput type="text" v-model="fullName" required="true">
        Full Name
      </TextInput>

      <TextInput type="email" v-model="email" required="true">
        Email
      </TextInput>

      <TextInput type="password" v-model="pw" required="true">
        Password
      </TextInput>

      <TextInput type="password" v-model="confirmPw" required="true">
        Confirm Password
      </TextInput>
        <br>
      <!-- <div class="form-check d-flex justify-content-center mb-5">
        <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" />
        <label class="form-check-label subtitle" for="form2Example3g">
          I agree all statements in <a href="#!" class="text-body"><u>Terms of service</u></a>
        </label>
      </div> -->

      <GreenSubmitBtn>
        Register
      </GreenSubmitBtn>

      <p class="text-center text-muted mt-5 mb-3 subtitle">Have already an account? 
        <RouterLink to="/login" class="fw-bold text-body">Login here</RouterLink>
      </p>


    </form>
  </MiddleCol>


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
      username:null,
      pw:null,
      confirmPw:null,
      email : null,
      fullName : null,

    }
  },

  methods: {
    async register(){
      var msg;
      try {
        if (this.pw != this.confirmPw){
          throw new Error("Password and Confirm password don't match")
        }

          var response = this.axios.post(`${import.meta.env.VITE_BACKEND}/user/register`,{
            username : this.username,
            password : this.pw,
            email : this.email,
            fullName : this.fullName
          })
          this.$router.push({ path: '/otp', query: { username: this.username } })
          this.$toast.success("Register Successful")        
      } catch (e){
        this.$toast.error( "Failed to Register: " + e.message)
      }

    }
  },



  mounted() {
    
  }
}
</script>