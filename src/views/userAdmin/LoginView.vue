<script setup>
  import { useUserStore } from '../../store/UserStore';
  import { mapStores } from 'pinia';
  import {toRaw} from 'vue';
  import Modal from '../../components/Modal.vue';
import GreenSubmitBtn from '../../components/GreenSubmitBtn.vue';
import TextInput from '../../components/TextInput.vue';
import bsModal from 'bootstrap/js/src/modal'
</script>

<template>
  <!-- type your HTML here -->


    <div class="container">
      <div class="row  justify-content-center align-items-center ">
        <div class="col-12 col-md-9 col-lg-7 col-xl-6">
          <div class="card w-100 m-3 pb-0 h-auto" style="border-radius: 15px;">
            <div class="card-body p-5 pb-0 h-50">
              <h1 class="text-uppercase text-center  title display-5">Login</h1>

              <form class="mb-0 p-5" @submit.prevent @submit="login">
                
                <TextInput v-model="username" type="text" :required="true">
                  Username
                </TextInput>

                <TextInput v-model="password" type="password" :required="true">
                  Password
                </TextInput>

                <GreenSubmitBtn>Login!</GreenSubmitBtn>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

<Modal>
  Failed to log in: 
    <br>{{ errorMsg }}
</Modal>
</template>

<style>
/* you can also import css files */
</style>

<script>
export default {

  // this is data, website will reload if this change
  data() {
    return {
      username : null,
      password : null,

      errorMsg : null
    }
  },

  methods: {
    login() {
      // you need to use this in the methods
      let data = { password : this.password}
      if (toRaw(this.username).includes("@")){
        data.email = this.username
      } else {
        data.username = this.username
      }

      this.axios.post(`${import.meta.env.VITE_BACKEND}/user/login`,data
      ). then((response)=>{
        this.userStore.username= response.data.username
        this.userStore.userId= response.data.userId

        this.$router.push(`/marketplace`)
      }).catch((error)=>{
        console.log(error)
        this.errorMsg = error.response.data.problem
        const myModal= new bsModal('#myModal')
        myModal.show()
      })
    }
  },
  mounted() {
  },
  computed: {
    ...mapStores(useUserStore)
  }
}
</script>