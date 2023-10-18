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
    // //this is how you import external css files
  // import "../assets/base.css"

</script>

<template>
  <!-- type your HTML here -->
  <main>


    <div class="container-fluid">
        <div class="row background">

            <div class="col">
                <!-- card -->
                <div class="card w-75 m-auto my-5  ">
                <div class="card-body  ">
                    
                    <div class="row">
                      <div class="col">
                  
                  <Btn @click="this.$router.go(-1)">
                    Back
                  </Btn>

                    <!-- carousel -->
                    <br>
                    <CustomCarousell  :images="['/src/assets/images/scott-lord-PiqZfESKt3k-unsplash.jpg']">

                    </CustomCarousell>

                    <!-- end carousel -->
                    You can add photos after this
                </div>
                        <div class="col">



    <VeeForm v-slot="{ handleSubmit }" ref="form" :validation-schema="schema" as="div" class="pb-3">
      <form @submit="handleSubmit($event, create)" >

        <div class="row mt-5">           
            <h1 class="title">Create New Listing</h1>
            <!-- <span class="badge text-bg-secondary float-end">Listing</span> -->                  
        </div>


        <div class="mb-3"> 
              <label for="exampleFormControlInput1" class="form-label title">Item Type</label> 
              <select class="form-select"  v-model="itemType">
                <option >Listed</option>
                <option >WishList</option>
              </select>

          </div> 

        <TextInput  name="itemName">
          Item Name
        </TextInput>


          <TextInput name="description" as="textarea">
          </TextInput>



          <div class="mb-3"> 
              <label for="exampleFormControlInput1" class="form-label title">Category</label> 
              <select class="form-select"  v-model="category">
                <option >Kitchenware</option>
                <option >Furniture</option>
                <option >Electronics</option>
                <option>Fashion</option>
              </select>

          </div> 

          <div class="mb-3"> 
              <label for="exampleFormControlInput1" class="form-label title">Category</label> 
              <select class="form-select"  v-model="condition">
                <option >new</option>
                <option >old</option>
              </select>
          </div> 

          <vue3-tags-input :tags="tags"
                   placeholder="enter some tags"
                   @on-tags-changed="handleChangeTag"
                   />




        
        <GreenSubmitBtn>Save!</GreenSubmitBtn>
    </form>
    </VeeForm>
                        </div>
                    </div>
                </div>
                </div>
                <!-- card end -->
            </div>
        </div>
    </div>



  </main>
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
          this.$router.push(`/item/${response.data.id}/addPhoto`)
        }
      ).catch(
        response => {
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
  }
}
</script>