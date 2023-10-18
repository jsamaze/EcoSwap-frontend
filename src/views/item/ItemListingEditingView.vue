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
                    <CustomCarousell v-if="images && images.length>0" :images=images>

                    </CustomCarousell>

                    <!-- end carousel -->
                    <RouterLink v-if="images.length < 5" :to='`/item/${this.$route.params.itemId}/addPhoto`'>
                      <GreenBtn>
                      Add photos
                      </GreenBtn>
                    </RouterLink>

                    <RouterLink :to='`/item/${this.$route.params.itemId}/deletePhoto`'>
                    <GreenBtn v-if="images[0] != '/src/assets/images/scott-lord-PiqZfESKt3k-unsplash.jpg'">
                      Delete photos
                    </GreenBtn>
                    </RouterLink>
                </div>
                        <div class="col">



    <VeeForm v-slot="{ handleSubmit }" ref="form" :validation-schema="schema" as="div" class="pb-3">
      <form @submit="handleSubmit($event, update)" >

        <div class="row mt-5">           
            <h1 class="title">Edit Listing</h1>
            <!-- <span class="badge text-bg-secondary float-end">Listing</span> -->                  
        </div>

        This is a {{ itemType }} item


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
      images:"",
      tags:[],
      schema : {
        itemName : yup.string().required(),
        description : yup.string(),
        condition : yup.string(),
        category : yup.string(),

      },

      category : null,
      condition : null,
    }
  },

  methods: {
    handleChangeTag(tags) {
      this.tags = tags;
    },

    update(values){
      console.log(values)
      values.tags = this.tags;
      values.category = this.category
      values.condition = this.condition
      console.log(JSON.stringify(values))
      var loader = this.$loading.show()

      this.axios.patch(`${import.meta.env.VITE_BACKEND}/item/${this.$route.params.itemId}`,values).then(
        response => {
          this.$toast.success("Updated item info")
        }
      ).catch(
        response => {
          this.$toast.error("Failed to update item info")
          console.log(response)
        }
      ).finally(
        
        () => {this.load()
          loader.hide()}
      )
    },
    load(){
      var loader = this.$loading.show()

this.axios.get(`${import.meta.env.VITE_BACKEND}/item/${this.$route.params.itemId}`)
    .then(response => {

      var data = response.data.data

        loader.hide()

        this.$refs.form.setValues({
          itemName : data.itemName,
          description : data.description,
        })

        this.itemType=data.itemType

        this.tags = data.tags
        this.category = data.category
        this.condition = data.condition

        if(data.user.username!= this.userStore.username){
          this.$toast.error("Access denied!")
          this.$router.go(-1)
          return;
        }

        this.images = response.data.data.photoURL.length > 0 ? response.data.data.photoURL : ["/src/assets/images/scott-lord-PiqZfESKt3k-unsplash.jpg"];



    })
    .catch( error => {
        console.log(error);
        this.$toast.error("Item loading error!")
        this.$router.go(-1)
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