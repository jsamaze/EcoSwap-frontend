<script setup>
  import { useUserStore } from '../../store/UserStore';
  import { mapStores } from 'pinia';
  import {toRaw} from 'vue';
import GreenSubmitBtn from '../../components/GreenSubmitBtn.vue';
import TextInput from '../../components/TextInput.vue';

import { Form as VeeForm, Field, ErrorMessage } from 'vee-validate';

import MiddleCol from '../../components/MiddleCol.vue'
import * as yup from 'yup';
</script>

<template>
  <!-- type your HTML here -->
  <MiddleCol class="mt-3">
    <VeeForm v-slot="{ handleSubmit }" ref="form" :validation-schema="schema" as="div" class="pb-3">
      <form @submit="handleSubmit($event, login)">
      <h1 class="text-center mb-5 title display-5">Login</h1>

      <TextInput  name="username">Username or Email</TextInput>
      <TextInput name="password"></TextInput>
      <GreenSubmitBtn>Login</GreenSubmitBtn>
      <p class="text-center text-muted mt-3 subtitle">Don't have an account?
      <RouterLink to="/register" class="fw-bold text-body">Sign up here</RouterLink>
      </p>
      <p class="text-center text-muted mb-3 subtitle">Forgot your password?
      <RouterLink to="/forgotPassword" class="fw-bold text-body">Click here</RouterLink>
      </p>
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
      schema :  yup.object({
        username: yup.string().required().label("Username or Email"),
        password: yup.string().required().min(2).label("Password"),
      })
    }
  },

  methods: {
    login(values) {
      // you need to use this in the methods

      var loader = this.$loading.show()

      this.axios.post(`${import.meta.env.VITE_BACKEND}/user/login`,values
      ). then((response)=>{
        loader.hide()
        this.userStore.username= response.data.username
        this.userStore.userId= response.data.userId
        this.$router.push(`/user/landing`)
      }).catch((error)=>{
        loader.hide()
        console.log(error)
        this.$toast.error(error.response.data.problem)
        this.$refs.form.resetForm();

      })
    }
  },
  created() {
    console.log(this)
  },
  computed: {
    ...mapStores(useUserStore)
  }
}
</script>