<script setup>
  //import these to access GLOBAL state variables
  import MiddleCol from '../../components/MiddleCol.vue'
  import GreenSubmitBtn from '../../components/GreenSubmitBtn.vue';
  import TextInput from '../../components/TextInput.vue';


  // //this is how you import external css files
  // import "../assets/base.css"

</script>

<template>
  <!-- type your HTML here -->

  <MiddleCol>
    <h1 class=" text-center mb-5 title display-5">
      {{ passwordReset ? "Reset Password" : "Confirm Email" }}
    </h1>

<form @submit.prevent="sendOTP">
  


  <TextInput type="text" maxLength="6" minLength="6" v-model="otp" required="true">
        One Time Password
      </TextInput>
<div v-if="passwordReset">
      <TextInput type="password" v-model="pw" required="true">
        Password
      </TextInput>

      <TextInput type="password" v-model="confirmPw" required="true">
        Confirm Password
      </TextInput>
</div>
    
      <!-- <button class="btn btn-danger">
        Request new OTP
      </button> -->

      <div>
        To get a new OTP, please go to settings page and change password/verify email
      </div>

    <GreenSubmitBtn class="m-3">
      Submit
    </GreenSubmitBtn>
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
      otp :null,
      pw : null,
      confirmPw : null,
      passwordReset:false,
      prevRoute:null,

    }
  },

  methods: {
    async sendOTP() {
      if (this.passwordReset&&this.pw!=this.confirmPw){
        this.$toast.error("Password does not match")
        this.pw = "";
        this.confirmPw="";
        const myModal= new bsModal('#myModal')
        myModal.show()
        return;
      }

      try{
        var response;
        if (this.passwordReset){
          response = await this.axios.post(`${import.meta.env.VITE_BACKEND}/user/confirmPassword`,{
            otp : this.otp,
            username : this.$route.query.username,
            password : this.pw
          })
        } else {
          response = await this.axios.post(`${import.meta.env.VITE_BACKEND}/user/confirmEmail`,{
            otp : this.otp,
            username : this.$route.query.username,
          })
        }

        this.$toast.success("You have successfully "+( this.passwordReset ?"changed password" : "confirmed email"))

        this.$router.push("/login")


      } catch (e){
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
    }
  },

  // where was I from
  mounted(){
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