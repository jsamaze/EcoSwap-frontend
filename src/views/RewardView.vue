<script setup>
  //import these to access GLOBAL state variables
import {RouterLink} from 'vue-router'
import TextInput from '../components/TextInput.vue';
import GreenBtn from '../components/GreenBtn.vue';
import GreenSubmitBtn from '../components/GreenSubmitBtn.vue';

import { Form as VeeForm } from 'vee-validate'

import * as yup from 'yup'

import { mapStores } from 'pinia';
import { useUserStore } from '../store/UserStore';
import MiddleCardForListing from '../components/MiddleCardForListing.vue';
import { placeholder } from '../assets/assets';
  // //this is how you import external css files
  // import "../assets/base.css"

</script>

<template>
  <!-- type your HTML here -->


   <MiddleCardForListing>
    
    <div class="container-fluid">
      <div class="row">
        <h1 >Total Points: </h1>
        
        <div class='col justify-content-center'>
            <div class="white p-3">
                <h3>Rewards</h3>
                
                <div class="card" style="width: 100%; height: auto;">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item ">
                        <b>$5 NTUC Voucher</b>
                        <br>5 points
                        <GreenSubmitBtn>Redeem</GreenSubmitBtn>
                    </li>
                    <li class="list-group-item">
                        <b>$5 NTUC Voucher</b>
                        <br>5 points
                        <GreenSubmitBtn>Redeem</GreenSubmitBtn>
                    </li>
                    <li class="list-group-item">
                        <b>$5 NTUC Voucher</b>
                        <br>5 points
                        <GreenSubmitBtn>Redeem</GreenSubmitBtn>
                    </li>
                </ul>
                </div>

            </div>
            
            
                
            
            
            

      </div>

        <div class='col  justify-content-center'>
          <div class="white p-3">
            <h3>Transactions</h3>

            <div class="card" style="width: 100%; height: auto;">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        <b>Listed Item</b>
                        <br>+5 points
                       
                    </li>
                    <li class="list-group-item">
                        <b>Add Wish List Item</b>
                        <br>+1 points
                       
                    </li>
                    <li class="list-group-item">
                        <b>Successfully Traded Item</b>
                        <br>+10 points
                       
                    </li>
                </ul>
                </div>
    

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
      emailVerified:false
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
            this.load(loader)
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
        this.load()
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