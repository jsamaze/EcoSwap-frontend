<script setup>
  //import these to access GLOBAL state variables
import {RouterLink} from 'vue-router'
import TextInput from '../../components/TextInput.vue';
import GreenBtn from '../../components/GreenBtn.vue';
import GreenSubmitBtn from '../../components/GreenSubmitBtn.vue';

import { Form as VeeForm } from 'vee-validate'

import * as yup from 'yup'

import { mapStores } from 'pinia';
import { useUserStore } from '../../store/UserStore';
import MiddleCardForListing from '../../components/MiddleCardForListing.vue';
import { placeholder } from '../../assets/assets';
  // //this is how you import external css files
  // import "../assets/base.css"

</script>

<template>
  <!-- type your HTML here -->


   <MiddleCardForListing>
    <div class="container-fluid">
      <div class="row">
        
        <div class='col justify-content-center'>
            <br><br>
            <img class="w-100 m-3" :src="src">
            <br>
            <br>
            <RouterLink to="/user/photo">
              <GreenBtn>
                Change Photo
              </GreenBtn>
            </RouterLink>

      </div>

        <div class='col  justify-content-center'>
          <div class="white p-3">
     <VeeForm v-slot="{ handleSubmit }" ref="form" :validation-schema="schema" as="div" class="pb-3">
      <form @submit="handleSubmit($event, update)" >

        <h1 class="title text-center">Account Settings</h1>
        Your email is {{ emailVerified ? "" : "not " }}verified
              <div v-if="!emailVerified">
                <GreenBtn @click="verifyEmail">Click here to verify email</GreenBtn>
              </div>
              <br><br>
        You cannot change your username: 
        <span class="text-center fw-bold">{{ userStore.username }}</span>

       
        <TextInput  name="fullName">
          Full name
        </TextInput>
        
        
            
              
              
        <TextInput  name="email">
          Email (If you change your email, you will need to receive OTP)
        </TextInput>

        

          <TextInput name="about" as="textarea">
                About
          </TextInput>

        
        <GreenSubmitBtn>Save changes</GreenSubmitBtn>
        <br>
        <div class="text-center">
          <h6 v-if="busStop">Current bus stop is : {{ busStop?.BusStopCode }} - {{ busStop?.Description }}</h6>
          <h4 v-else>You are yet to choose a preferred bus stop!</h4>
          <GreenBtn @click="$router.push('/user/busStop')">
          Click here to change your preferred bus stop
          </GreenBtn>
        </div>


          
          

          <GreenBtn @click="changePassword">Click here to change password</GreenBtn>

         
    </form>
    </VeeForm>

    
        </div>
        
      </div>
    </div>
</div>

   </MiddleCardForListing>
</template>

<style scoped> 

</style>

<script>
export default {

  // this is data, website will reload if this change
  computed : {
    ...mapStores(useUserStore)
  },
  data() {

    return {
      initialValues: null,
      schema : yup.object().shape({
        fullName : yup.string().required(),
        preferredBusStop : yup.string().max(5)
        .test('Digits only', 'The field should have digits only', (value) =>  value.toString().length==0||/^\d+$/.test(value))
        .label("Preferred Bus Stop"),

                email : yup.string().required().email(),
      }),
      oldEmail: "",
      src:placeholder,
      emailVerified:false,
      busStop : null,
    }
  },

  methods: {
    async update(data) {
      // you need to use this in the methods

      var loader = this.$loading.show()

      if (data.email == this.oldEmail){
        data.email = this.newEmail
      }

      var vm = this

      this.axios.patch(`${import.meta.env.VITE_BACKEND}/user`,data).then(
        response =>{
          if (data.email){
            this.verifyEmail(loader)
          }else {
            this.$toast.success("Success!")

            // this.$router.go(0) //replace later
          }
        }
      ).catch (
        e=>{
          this.load(loader)
          console.log(e)
          this.$toast.error("Fail " + e.response.data.problem )
        }
      )
    },
    changePassword(){
      this.$router.push("/forgotPassword")
    },
    async verifyEmail(loader){
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
        }
      ).finally(()=>{
        loader.hide()
  
      })
    },

    load(loader){
      let loader1 = loader ? loader : this.$loading.show();

//dont forget to use this keyword
               // this is a reference to the backend URL in .env.local file
      this.axios.get(`${import.meta.env.VITE_BACKEND}/user/${this.userStore.username}`).then( response => {
        // below is all the information taken from response, assigned to this."data"
        console.log(response);
        loader1.hide()
        var path = response.data.data;

        this.$refs.form.setValues({
          about : path.about,
          email : path.email,
          fullName : path.fullName,
          preferredBusStop : path.preferredBusStop
        })

        this.busStop = path.busStop


        this.oldEmail = path.email;
        this.emailVerified = path.emailVerified
        this.username = path.username
        this.src = path.imageURL.length > 0 ? path.imageURL : placeholder
        }
      ).catch ( error => {
      })
    }
  },


  //any ajax call to start is executed here
  created() {
    this.load()
  }
}
</script>