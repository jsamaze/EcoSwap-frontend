<script setup>
  //import these to access GLOBAL state variables
  import MiddleCol from '../../components/MiddleCol.vue'
  import GreenSubmitBtn from '../../components/GreenSubmitBtn.vue';
  import TextInput from '../../components/TextInput.vue';
  import {Field, Form as VeeForm} from 'vee-validate'
  import * as yup from 'yup'


  // //this is how you import external css files
  // import "../assets/base.css"

</script>

<template>
  <!-- type your HTML here -->

  
  <MiddleCol>
    <VeeForm v-slot="{ handleSubmit }" ref="form" :validation-schema="schema" as="div" class="pb-3">
      <form @submit="handleSubmit($event, sendOTP)">
      <h1  class=" text-center mb-5 title display-5">
        {{ passwordReset ? "Reset Password" : "Confirm Email" }}
      </h1>
      <TextInput name="otp">
        OTP
      </TextInput>
      <div v-if="passwordReset">
        <TextInput  name="password"></TextInput>
      <TextInput name="passwordConfirmation">
        Confirm password
      </TextInput>

      </div>

      <p>
        To resend OTP, please go to account settings page after you have logged in
      </p>

        
        <GreenSubmitBtn>Submit</GreenSubmitBtn>


    </form>
    </VeeForm>
  </MiddleCol>







</template>

<style>
/* you can also import css files */
</style>

<script>
export default {

  computed : {
    schema(){
      var s = {
        otp : yup.number().min(0).max(999999).required().label("OTP"),
    }


    if (this.passwordReset){
      s.password= yup.string().min(8).required().matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,"Your password must have only letter and digit. At least one letter and one digit").label("Password"),
      s.passwordConfirmation= yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords do not match')
      .required("Please confirm your password")
    }
    console.log(s)
    return yup.object().shape(s)
  }
  },

  // this is data, website will reload if this change
  data() {
    return {
      passwordReset:false,
      prevRoute:null,
    
  }
  },



  methods: {
    async sendOTP(values) {
      var loader = this.$loading.show()
      values.username = this.$route.query.username

      try{
        var response;
        if (this.passwordReset){
          response = await this.axios.post(`${import.meta.env.VITE_BACKEND}/user/confirmPassword`,values)
        } else {
          response = await this.axios.post(`${import.meta.env.VITE_BACKEND}/user/confirmEmail`,values)
        }

        loader.hide()

        this.$toast.success("You have successfully "+( this.passwordReset ?"changed password" : "confirmed email"))

        this.$router.push("/login")


      } catch (e){
        loader.hide()

        console.log(e)
        var msg;
        switch (e.response.status){
          case 401:
            msg = "OTP is expired. Please try again"
            

            break;
          case 500:
            msg = "Error! Please try again later"
            break;
        }
        this.$toast.error(msg)
        this.$router.go(-1)
      }
    },
  },

  // where was I from
  created(){
    console.log(window.history.state.back)

    switch (window.history.state.back){
      case "/forgotPassword":
        this.passwordReset=true;
        break;
      case "/register":
        this.passwordReset=false;
        break;
      case "/user/settings":
        this.passwordReset=false;
        break;
      default:
        this.$router.go(-1);
        break;
    }
  }


  //any ajax call to start is executed here

}
</script>