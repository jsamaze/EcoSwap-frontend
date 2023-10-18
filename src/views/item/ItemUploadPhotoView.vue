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
                    <RouterLink :to='`/item/${this.$route.params.itemId}/addPhoto`'>
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

      <!-- Component 1 of this page - the file upload button -->
      <div class="mb-3" v-show="showFileInput">
        <label for="formFile" class="form-label">Upload one photo</label>
        <input class="form-control " id="formFile" type="file" ref="fileInput" name="avatar" v-show="showFileInput" accept="image/*" @change="pictureUpload()" />
      </div>

      <div v-show="!optionsShow">
      <div id="cropper" :style="{display:cropperDisplay}">
            <!--  Component 2 of this page the part where you crop - the cropper is put on this img element -->
            <!-- dont use v-if -->
            <img ref="imageCrop" src="" class="img-fluid" alt="Picture" v-show="showCanvas" :style="{display:'block', maxWidth:'100%'}">
      </div>

      <GreenBtn @click="send" id="SendButton" v-if="sendButtonDisplay">
        Send!
      </GreenBtn>

    </div>

    <div v-show="optionsShow">
      <RouterLink :to='`/item/${this.$route.params.itemId}/addPhoto`'>
        <GreenBtn>
        Upload another photo
      </GreenBtn >
      </RouterLink >

      <RouterLink :to='`/item/${this.$route.params.itemId}/edit`'>
        <GreenBtn>
        Edit other parts of listing
      </GreenBtn>
      </RouterLink>

    </div>


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

      showFileInput:true,
      showCanvas:false,
      cropperDisplay:'none',
      sendButtonDisplay:false,
      cropper:null,
      category : null,
      condition : null,
    }
  },

  methods: {


    async pictureUpload (){
      var fileInput= this.$refs.fileInput; //this is how you get the HTMLElement a la DOM
      var imageElement = this.$refs.imageCrop;
      //pls pls dont rearrange this code it is working already
      // if the cropper is hidden while configured, it may not display properly
      console.log(imageElement)

        //if someone submit a file
        if (fileInput.files.length){

          
          this.sendButtonDisplay='block';
            this.cropperDisplay='block';
            this.showCanvas=true;

            console.log(imageElement)
            imageElement.src = URL.createObjectURL(fileInput.files[0]);
            imageElement.onload = () => {
                URL.revokeObjectURL(imageElement.src);
            };
            this.cropper = await new Cropper(imageElement,{
                aspectRatio: 1, //you can change aspect ratio of cropper here
            });

            this.showFileInput=false;

            this.$toast.info("Please crop your photo",{
            })

        }


        },
        send (){
          var loader = this.$loading.show()
            this.showFileInput=false
            console.log(toRaw(this.cropper));
            var vm = this; 
            toRaw(this.cropper).getCroppedCanvas().toBlob((blob) => {

                //replace with the API end point u need
                this.axios.postForm( `${import.meta.env.VITE_BACKEND}/item/${this.$route.params.itemId}/photo/`, {
                    itemPhoto:  blob
                }).then(function (response) {
                  loader.hide()
                // handle success
                vm.$toast.success("Picture successfully uploaded")
                // if okay go to /home
            }).catch (function (error){
              console.log(error)
              vm.$toast.error("Picture failed to be uploaded")
            }).finally(
              ()=>{
                this.optionsShow = true
                this.load()
              }
            );
            })
        },
    load(){
      var loader = this.$loading.show()

this.axios.get(`${import.meta.env.VITE_BACKEND}/item/${this.$route.params.itemId}`)
    .then(response => {

      var data = response.data.data
      if (data.user.username != this.userStore.username){
          this.$toast.error("You cannot modify items that are not yours")
          this.$router.push(`/item/${this.$route.params.itemId}`)
        }


        loader.hide()

        this.images = response.data.data.photoURL.length > 0 ? response.data.data.photoURL : ["/src/assets/images/scott-lord-PiqZfESKt3k-unsplash.jpg"];

        if (this.images.length >= 5){
          this.$toast.error("You can only have a maximum of 5 photos")
          this.$router.push(`/item/${this.$route.params.itemId}/edit`)
        }


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