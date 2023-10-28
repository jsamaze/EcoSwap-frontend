<script setup>
  //import these to access GLOBAL state variables
  import {RouterLink} from 'vue-router'
import MiddleCol from '../../components/MiddleCol.vue';
import TextInput from '../../components/TextInput.vue';
import GreenSubmitBtn from '../../components/GreenSubmitBtn.vue';
import { userStore } from '../../main';
import {mapStores} from 'pinia'
import { useUserStore } from '../../store/UserStore';

import {Field, Form as VeeForm} from 'vee-validate'
  import * as yup from 'yup'


  // //this is how you import external css files
  // import "../assets/base.css"

</script>

<template>
  <!-- type your HTML here -->

  <MiddleCol>

    <h1 class="text-center mb-5 title display-5">Forgot Password</h1>
    
    <VeeForm v-slot="{ handleSubmit }" ref="form" 
    :initial-values="initialValues" :validation-schema="schema" as="div" class="pb-3">
      <form @submit="handleSubmit($event, forgetPassword)">


    <TextInput name="username">
      </TextInput>
      
      <GreenSubmitBtn>Generate OTP</GreenSubmitBtn>

    </form>
    </VeeForm>


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
      schema :  yup.object().shape({
      username : yup.string().required().label("Username").__context,
      }),
      username : "",
      initialValues : {
        username : null
      },
    }
  },

  methods: {
    forgetPassword(values) {
      var load = this.$loading.show()
      this.axios.get(`${import.meta.env.VITE_BACKEND}/user/generateOTP`,{
        params : {
          username : values ? values.username : this.username
        }
      }).then(
        response => {
          load.hide()
          this.$toast.success( "OTP sent! Please check your email.")
          this.$router.push({ path: '/otp', query: { username: values.username } })
        }
      ).catch(
        response => {
          load.hide()
          this.$toast.error("Error in sending OTP")
          this.$refs.form.resetForm();

        }
      )

    }
  },


  //any ajax call to start is executed here
  created() {
    if (userStore.username){
      this.initialValues.username = userStore.username
    }
  },

  mounted(){
    if (userStore.username){
      this.forgetPassword(this.initialValues)
    }
  },

  computed: {
    ...mapStores(useUserStore)
  }
}
</script>