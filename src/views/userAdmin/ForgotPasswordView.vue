<script setup>
  //import these to access GLOBAL state variables
  import {RouterLink} from 'vue-router'
import MiddleCol from '../../components/MiddleCol.vue';
import TextInput from '../../components/TextInput.vue';
import GreenSubmitBtn from '../../components/GreenSubmitBtn.vue';
import MyModal from '../../components/Modal.vue'

import bsModal from 'bootstrap/js/src/modal'
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

<MyModal>
{{  msg }}
</MyModal>


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
      msg: "",
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
          this.msg = "OTP sent - please check your email"
          const myModal= new bsModal('#myModal')
          myModal.show()
          this.$router.push({ path: '/otp', query: { username: this.username } })
        }
      ).catch(
        response => {
          this.msg = "Error in sending OTP"
          this.email = ''
          const myModal= new bsModal('#myModal')
          myModal.show()
        }
      )

    }
  },


  //any ajax call to start is executed here
  mounted() {

  }
}
</script>