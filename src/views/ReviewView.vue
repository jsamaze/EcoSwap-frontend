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
      <div class="row m-5">
        
        
        <div class='col justify-content-center'>
            <div class="white p-3">
                <h3>Completed Reviews</h3>
                
                <div class="card" style="width: 100%; height: auto;">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item ">
                        Review for User: JaneSmith456
                        <br>Rating: 4.5 out of 5
                        <br>Comment: "Jane was a pleasure to trade with. The item was in great condition, and the exchange was smooth and easy. Highly recommended!"
                    </li>
                    <li class="list-group-item">
                        Review for User: GreenThumb77
                        <br>Rating: 5 out of 5
                        <br>Comment: "GreenThumb77 is a true environmentalist! We traded eco-friendly items, and the process was quick and hassle-free. Looking forward to more trades."
                    </li>
                    <li class="list-group-item">
                        Review for User: RetroQueen22
                        <br>Rating: 4 out of 5
                        <br>Comment: "RetroQueen22 has an impressive collection of vintage items. The trade went well, but there was a minor delay. Still, I'm happy with my new items."
                    </li>
                </ul>
                </div>

            </div>
            
            
                
            
            
            

      </div>

        <div class='col  justify-content-center'>
          <div class="white p-3">
            <h3>Uncompleted Reviews</h3>

            <div class="card" style="width: 100%; height: auto;">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        For user: SustainableSoul
                        <br>Date of transaction: 8 Dec 2022
                        <br> 
                        <TextInput name="Review:"></TextInput>
                        <GreenSubmitBtn>Submit Review</GreenSubmitBtn>

                       
                    </li>
                    <li class="list-group-item">
                        For user: SustainableSoul
                        <br>Date of transaction: 8 Dec 2022
                        <br> 
                        <TextInput name="Review:"></TextInput>
                        <GreenSubmitBtn>Submit Review</GreenSubmitBtn>

                       
                    </li>
                    <li class="list-group-item">
                        For user: SustainableSoul
                        <br>Date of transaction: 8 Dec 2022
                        <br> 
                        <TextInput name="Review:"></TextInput>
                        <GreenSubmitBtn>Submit Review</GreenSubmitBtn>

                       
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