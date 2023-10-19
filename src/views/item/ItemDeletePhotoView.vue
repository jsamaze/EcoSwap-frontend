<script setup>
  //import these to access GLOBAL state variables
  import {RouterLink} from 'vue-router'
  import CustomCarousell from '../../components/CustomCarousell.vue';
  import Btn from '../../components/Btn.vue';

  import {Form as VeeForm, Field} from 'vee-validate'
  import TextInput from '../../components/TextInput.vue'

  import GreenSubmitBtn from '../../components/GreenSubmitBtn.vue'
  import GreenBtn from '../../components/GreenBtn.vue'

  import Vue3TagsInput from 'vue3-tags-input';

  import {useUserStore} from '../../store/UserStore'
  import {mapStores} from 'pinia'

  import Cropper from 'cropperjs';

  import { toRaw } from 'vue';
  import * as yup from 'yup'
import MiddleCardForListing from '../../components/MiddleCardForListing.vue';
    // //this is how you import external css files
  // import "../assets/base.css"

</script>



<template>
  <!-- type your HTML here -->


  <MiddleCardForListing>
    <h1 class="title text-center">Delete Photo from Listing</h1>
    <div class="row justify-content-center">

        <div class="col-4 p-3"  v-for="img, idx in images">
            <div class="img-wrap">
            <span class="close" @click="deletePhoto(idx)">&times;</span>
            <img :src="img" class="w-100" style="min-width: 100%;">
        </div>
        </div>

    </div>

    <RouterLink :to="`/item/${$route.params.itemId}/edit`">
        <GreenBtn>
        Go back to editing listing
        </GreenBtn>
    </RouterLink>

    
    
  </MiddleCardForListing>
                    



</template>



<style scoped>
.img-wrap {
    position: relative;
    display: inline-block;
    border: 1px red solid;
    min-width: auto;
    font-size: 0;
}
.img-wrap .close {
    position: absolute;
    top: 2px;
    right: 2px;
    z-index: 100;
    background-color: #FFF;
    padding: 5px 2px 2px;
    color: #000;
    font-weight: bold;
    cursor: pointer;
    opacity: .2;
    text-align: center;
    font-size: 22px;
    line-height: 10px;
    border-radius: 50%;
    width:5%
}
.img-wrap:hover .close {
    opacity: 1;
}
</style>

<script>
export default {

  // this is data, website will reload if this change
  data() {
    return {
      images:null,
    }
  },

  methods: {

    deletePhoto(key){
        var load = this.$loading.show()
        console.log(key)
        this.images.splice(key,1)
        this.axios.delete(`${import.meta.env.VITE_BACKEND}/item/${this.$route.params.itemId}/photo`,{
            params: {index : key}
        }).then(
            response => {
                if (this.images.length == 0 ){
                    this.$toast.info("This listing no longer has photos")
                    this.$route.push(`${import.meta.env.VITE_BACKEND}/item/${this.$route.params.itemId}/edit`)
                }
            }
        ).catch(
            e =>{
                this.$toast.error("Failed to delete photo!")
                this.load(load)
            }
        ). finally(
            load.hide()
        )
    },


    load(loader){
      var loader = loader || this.$loading.show()

      this.axios.get(`${import.meta.env.VITE_BACKEND}/item/${this.$route.params.itemId}`)
    .then(response => {

        console.log(response.data.data)


    //     console.log(response)
    //   var data = response.data.data
      if (response.data.data.user.username != this.userStore.username){
          this.$toast.error("You cannot modify items that are not yours")
          this.$router.push(`/item/${this.$route.params.itemId}`)
        }

    //     console.log(data)

        loader.hide()

        this.images =  response.data.data.photoURL

        if (this.images.length == 0){
          this.$toast.error("You don't have any photos")
          this.$router.push(`/item/${this.$route.params.itemId}/edit`)
        }


    })
    .catch( error => {
        console.log(error);
        this.$toast.error("Item loading error!")
        this.$router.push(`/item/${this.$route.params.itemId}/edit`)
    });
    }
  },

  computed : {
    ...mapStores(useUserStore)
  },


  //any ajax call to start is executed here
  created() {
    this.load()
  }
}
</script>