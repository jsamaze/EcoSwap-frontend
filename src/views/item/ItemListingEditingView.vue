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
          <Btn style="margin: 0 !important; width: fit-content;" @click="$router.push(`/item/${this.$route.params.itemId}`)">
            Back
          </Btn>
        </div>

        <div class="row align-items-start">
          <div class="col-sm-6">
            <!-- carousel -->
            <br>
            <CustomCarousell v-if="images && images.length>0" :images=images>

            </CustomCarousell>

            <!-- end carousel -->

            <div class="row mt-4">
                <RouterLink v-if="images.length < 5" :to='`/item/${$route.params.itemId}/addPhoto`' class="btn btn-success btn-md" style="width: fit-content;">
                Edit photos
                </RouterLink>
            </div>

            <div class="row mt-4">
              <button v-if="!done" type="button" class="btn btn-danger btn-md"
                data-bs-toggle="modal" data-bs-target="#exampleModal" style="width: fit-content;">
                  Delete listing
              </button>
            </div>

          </div>
                        <div class="col-sm-6">



    <VeeForm v-slot="{ handleSubmit }" ref="form" :validation-schema="schema" as="div" class="pb-3">
      <form @submit="handleSubmit($event, update)" >

        <div class="row mt-3">           
            <h1 class="title text-center">Edit {{ itemType }} Item</h1>
            <!-- <span class="badge text-bg-secondary float-end">Listing</span> -->                  
        </div>

        <TextInput  name="itemName" class="mt-2">
          Item Name
        </TextInput>

        <TextInput name="description" as="textarea">
        </TextInput>

        <div class="mt-2">
          <label for="exampleFormControlInput1" class="form-label titleBold">Category</label> 
          <select class="form-select"  v-model="category">
            <option >Kitchenware</option>
            <option >Furniture</option>
            <option >Electronics</option>
            <option>Fashion</option>
          </select>
        </div> 

        <div class="mt-4 text-capitalize"> 
          <label for="exampleFormControlInput1" class="form-label titleBold">Condition</label> 
          <select class="form-select"  v-model="condition">
            <option>New</option>
            <option>Old</option>
          </select>
        </div>

        <div class="mt-4">
          <h6>Tags</h6>
          <vue3-tags-input :tags="tags"
            placeholder="Tags"
            @on-tags-changed="handleChangeTag"
            />
        </div>




        
        <GreenSubmitBtn>Save!</GreenSubmitBtn>
    </form>
    </VeeForm>
                        </div>
                    </div>
      </MiddleCardForListing>


<!-- modal -->
<div class="modal fade" id="exampleModal" tabindex="0" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Delete Item Confirmation</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Are you sure you want to delete this item?
        This action will be permanent!
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="test">Delete</button>
      </div>
    </div>
  </div>
</div>
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
      done: null,
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
      itemType:"",
    }
  },

  methods: {
    // test(){
    //   console.log("EEE")
    // },
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
    test(){
      console.log('"all" :>> ', "all");
      var l = this.$loading.show()
      this.axios.delete(`${import.meta.env.VITE_BACKEND}/item/${this.$route.params.itemId}`).then(
        resp =>{
          this.$toast.success("Successfully deleted item!")
          this.$router.push("/user/marketplace")
        }
      ).catch(
        e =>{
          console.log(e)
          this.$toast.success("Failed to delete item!")
          this.load()
        }
      ).finally(
        ()=> l.hide()
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

this.done = data.done ?? false

        this.tags = data.tags
        this.category = data.category
        this.condition = data.condition

        if(data.user.username!= this.userStore.username){
          this.$toast.error("Access denied!")
          this.$router.push( `/item/${this.$route.params.itemId}`)
          return;
        }

        this.images = response.data.data.photoURL.length > 0 ? response.data.data.photoURL : [placeholder];



    })
    .catch( error => {
        console.log(error);
        this.$toast.error("Item loading error!")
        this.$route.push(`/item/${this.$route.params.itemId}`)
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