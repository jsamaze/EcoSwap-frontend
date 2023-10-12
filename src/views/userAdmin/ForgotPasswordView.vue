<script setup>
  //import these to access GLOBAL state variables
  import {RouterLink} from 'vue-router'
import MiddleCol from '../../components/MiddleCol.vue';
import TextInput from '../../components/TextInput.vue';
import GreenSubmitBtn from '../../components/GreenSubmitBtn.vue';
import { userStore } from '../../main';
import {mapStores} from 'pinia'

  // //this is how you import external css files
  // import "../assets/base.css"

</script>

<template>
  <!-- type your HTML here -->

  <MiddleCol>
    <h1 class="text-uppercase text-center  title display-5">Forgot Password</h1>

    <form class="mb-0 p-5" @submit.prevent="forgetPassword">
                
      <TextInput v-model="username" type="text" :required="true">
        Username
      </TextInput>
      
      <GreenSubmitBtn>Generate OTP!</GreenSubmitBtn>

    </form>

  </MiddleCol>

</template>



<style>
/* you can also import css files */
</style>

<script>
export default {

  // this is data, website will reload if this change
  data() {
    return {
      email:"",
    }
  },

  methods: {
    forgetPassword() {
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
  mounted() {
    if (userStore.username){
      this.username = userStore.username
      this.forgetPassword
    }
  },

  computed: {
    ...mapStores(userStore)
  }
}
</script>