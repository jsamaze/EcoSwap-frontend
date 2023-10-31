<script setup>
  import {RouterLink} from 'vue-router'
  import MiddleCol from '../../components/MiddleCol.vue';
  import TextInput from '../../components/TextInput.vue';
  import GreenSubmitBtn from '../../components/GreenSubmitBtn.vue'
import {Form as VeeForm} from 'vee-validate'
import * as yup from 'yup'
</script>

<template>
  <!-- type your HTML here -->

  <MiddleCol>
    <VeeForm v-slot="{ handleSubmit }" ref="form" :validation-schema="schema" as="div" class="pb-3">
      <form @submit="handleSubmit($event, register)">
        <h1 class="title text-center mb-5 display-5">Register</h1>
        <TextInput name="username"></TextInput>
        <TextInput name="fullName">Full name</TextInput>
        <TextInput name="email"></TextInput>
        <TextInput name="password"></TextInput>
        <TextInput name="passwordConfirmation">Confirm password</TextInput>
        <GreenSubmitBtn>Register</GreenSubmitBtn>
        <p class="text-center text-muted mt-5 mb-3 subtitle">Already have an account? 
        <RouterLink to="/login" class="fw-bold text-body">Login here</RouterLink>
        </p>
      </form>
    </VeeForm>
  </MiddleCol>


</template>


<style>
.hi{
  height: 900px;
}

</style>

<script>
export default {

  data() {
    return {
      schema :  yup.object().shape({
      password: yup.string().min(8).matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,"Your password must have only letter and digit. At least one letter and one digit").required().label("Password"),
      passwordConfirmation: yup
      .string()
      .required("Please confirm your password")
      .oneOf([yup.ref('password')], 'Passwords do not match'),
      username : yup.string().required()
       .test('Username', 'Username cannot contains space', (yourValue) =>
            !yourValue.includes(' ')).label("Username"),
      fullName : yup.string().required().label("Full name"),
      email: yup.string().email("Please enter a valid email").required().label("Email"),
      })
    }
    },

  methods: {
    async register(values){
      let loader = this.$loading.show({});
      var msg;
      try{
          var response = await this.axios.post(`${import.meta.env.VITE_BACKEND}/user/register`,values)
          this.$router.push({ path: '/otp', query: { username: values.username } })
          loader.hide()
          this.$toast.success("Register Successful")    
          this.$toast.info("You can add a profile picture in your account settings",{
            onClick: function(){
              this.$router.push("/user/photo")
            }
          })    
      } catch (e){
        loader.hide()
        this.$toast.error("Failed to Register: " + e.response.data.problem)
        this.$refs.form.resetForm();

      }

    }
  },


}
</script>