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

  import * as yup from 'yup'
import MiddleCardForListing from '../../components/MiddleCardForListing.vue';
    // //this is how you import external css files
  // import "../assets/base.css"
  import {placeholder} from '../../assets/assets'

</script>

<template>
  <!-- type your HTML here -->

<MiddleCardForListing>
  <div class="row justify-content-start m-3">
    <Btn style="margin: 0 !important; width: fit-content;" @click="$router.push(`/user/landing`)">
      Back
    </Btn>
  </div>
  <div class="row align-items-start">
    <div class="col-11">

    <VeeForm v-slot="{ handleSubmit }" ref="form" :validation-schema="schema" as="div" class="pb-3">
      <form @submit="handleSubmit($event, create)" >

        <div class="row mt-3">           
            <h1 class="title">Create new listing</h1>
                
        </div>

        <div class="mt-2"> 
          <label for="exampleFormControlInput1" class="form-label titleBold">Item type</label> 
          <select class="form-select"  v-model="itemType">
            <option >Listed</option>
            <option >Wish list</option>
          </select>
        </div> 

        <TextInput  name="itemName" class="mt-4">
          Item name
        </TextInput>

        <TextInput name="description" as="textarea">
        </TextInput>

        <label for="exampleFormControlInput1" class="form-label titleBold">Category</label> 
        <select class="form-select"  v-model="category">
          <option >Kitchenware</option>
          <option >Furniture</option>
          <option >Electronics</option>
          <option>Fashion</option>
        </select>

        <div class="mt-4"> 
            <label for="exampleFormControlInput1" class="form-label titleBold">Condition</label> 
            <select class="form-select"  v-model="condition">
              <option value="new" selected>New</option>
              <option value="old">Old</option>
            </select>
        </div> 

        <div class="mt-4">
          <span class="titleBold">Tags</span>
          <vue3-tags-input :tags="tags"
            placeholder="Tags"
            @on-tags-changed="handleChangeTag" class="mt-2"/>
        </div>

        <div class="mt-5">
          <GreenSubmitBtn>Save</GreenSubmitBtn>
        </div>

    </form>
    </VeeForm>
                        </div>
                    </div>

</MiddleCardForListing>
                    
</template>

<style>
/* you can also import css files */

.card{
    width: 700px;
    height: 700px;
}
.bold{
    font-weight: bold;
}
</style>

<script>
export default {

  // this is data, website will reload if this change
  data() {
    return {
      tags:[],
      schema : {
        itemName : yup.string().required(),
        description : yup.string(),
      },

      category :"Kitchenware",
      condition : "new",
      itemType : "Listed",
    }
  },

  methods: {
    handleChangeTag(tags) {
      this.tags = tags;
    },

    create(values){
      console.log(values)
      values.tags = this.tags;
      values.category = this.category
      values.condition = this.condition
      var loader = this.$loading.show()

      this.axios.post(`${import.meta.env.VITE_BACKEND}/item`,values,{
        params : {type : this.itemType}
      }).then(
        response => {
          this.$toast.success("Create new item")
          console.log(response)
          this.$router.push(`/item/${response.data.id}/addPhoto`)
        }
      ).catch(
        response => {
          console.log(response)
          this.$toast.error("Failed to create item")
        }
      ).finally(
        
        () => {
          loader.hide()
        }
      )
    }
  },

  computed : {
    ...mapStores(useUserStore)
  },


  //any ajax call to start is executed here
  created() {
    console.log(this.$route.query.itemType)
    if(this.$route.query.itemType){
      this.itemType = this.$route.query.itemType
    }
  }
}
</script>