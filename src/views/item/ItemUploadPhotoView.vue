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
  import {placeholder} from '../../assets/assets'

</script>

<template>
  <!-- type your HTML here -->


  <MiddleCardForListing>
    <div class="row justify-content-start m-3">
      <Btn style="margin: 0 !important; width: fit-content;" @click="$router.push(`/item/${$route.params.itemId}/edit`)">
        Back to editing listing
      </Btn>
    </div>
    <div class="row align-items-start mt-4">
      <div class="col-sm-6 mb-3">
      <!-- carousel -->
      <CustomCarousell v-if="images && images.length>0" :images=images>
      </CustomCarousell>
      <!-- end carousel -->
      <div class="row m-auto">
        <RouterLink :to='`/item/${$route.params.itemId}/deletePhoto`'>
          <GreenBtn v-if="images[0] != placeholder">
            Delete photos
          </GreenBtn>
        </RouterLink>
      </div>
    </div>
    <div class="col-sm-6">

      <h1 class="title">Add photo to listing</h1>

      <!-- Component 1 of this page - the file upload button -->
      <div class="mb-3" v-show="showFileInput">
        <label for="formFile" class="form-label">Upload one photo at a time</label>
        <input class="form-control" id="formFile" type="file" ref="fileInput" name="avatar" v-show="showFileInput" accept="image/*" @change="pictureUpload()" />
      </div>

      <div v-show="!optionsShow">
      <div id="cropper" :style="{display:cropperDisplay}">
            <!--  Component 2 of this page the part where you crop - the cropper is put on this img element -->
            <!-- dont use v-if -->
            <img ref="imageCrop" class="img-fluid" alt="Picture" v-show="showCanvas" :style="{display:'block', maxWidth:'100%'}">
      </div>

      <Btn @click="send" id="SendButton" v-if="sendButtonDisplay">
        Save changes
      </Btn>
      </div>


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
      images:"",

      showFileInput:true,
      showCanvas:false,
      cropperDisplay:'none',
      sendButtonDisplay:false,
      cropper:null,
      category : null,
      condition : null,
      optionsShow:false,
    }
  },

  methods: {


    async pictureUpload (){
      var fileInput= this.$refs.fileInput; //this is how you get the HTMLElement a la DOM
      var imageElement = this.$refs.imageCrop;
      //pls pls dont rearrange this code it is working already
      // if the cropper is hidden while configured, it may not display properly
      // console.log(imageElement)

        //if someone submit a file
        if (fileInput.files.length){

          
          this.sendButtonDisplay='block';
            this.cropperDisplay='block';
            this.showCanvas=true;

            console.log(imageElement)

            var fr = new FileReader();

            var vm = this

            fr.onload = async function () {
              imageElement.src = fr.result;
              if (vm.cropper){
                vm.cropper.destroy()
              }
              vm.cropper = await new Cropper(imageElement,{
                  aspectRatio: 1, //you can change aspect ratio of cropper here
                  zoomable: false,
                  zoomOnTouch:false,
                  zoomOnWheel:false,
                  movable:false,
                  rotatable:false,
                });

              // vm.showFileInput=false;

              vm.$toast.info("Please crop your photo",{
              })
            }

            await fr.readAsDataURL(fileInput.files[0]);

        }


        },
        send (){
          var loader = this.$loading.show()
            // this.showFileInput=false
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
                // this.optionsShow = true
                this.cropper.destroy()
                this.$refs.imageCrop.src = null
                this.showCanvas=false
                this.load()
                this.clearInputFile(this.$refs.fileInput)
                this.sendButtonDisplay=false
              }
            );
            })
        },
        // https://stackoverflow.com/questions/1703228/how-can-i-clear-an-html-file-input-with-javascript
         clearInputFile(f){
    if(f.value){
        try{
            f.value = ''; //for IE11, latest Chrome/Firefox/Opera...
        }catch(err){ }
        if(f.value){ //for IE5 ~ IE10
            var form = document.createElement('form'),
                parentNode = f.parentNode, ref = f.nextSibling;
            form.appendChild(f);
            form.reset();
            parentNode.insertBefore(f,ref);
        }
    }
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

        this.images = response.data.data.photoURL.length > 0 ? response.data.data.photoURL : [placeholder];

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