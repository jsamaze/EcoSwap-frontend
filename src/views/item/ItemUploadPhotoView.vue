<script setup>
  import '../../../node_modules/cropperjs/dist/cropper.js';
  import '../../../node_modules/cropperjs/dist/cropper.css';
</script>

<template>

  <MiddleCol>
    <h3>Let's upload one more photo</h3>

      <!-- Component 1 of this page - the file upload button -->
      <div class="m-3" v-show="showFileInput">
        <label for="formFile" class="form-label">Upload one photo</label>
        <input class="form-control " id="formFile" type="file" ref="fileInput" name="avatar" v-show="showFileInput" accept="image/*" @change="pictureUpload()" />
      </div>
      <div class='m-5' id="cropper" :style="{display:cropperDisplay}">
            <!--  Component 2 of this page the part where you crop - the cropper is put on this img element -->
            <!-- dont use v-if -->
            <img ref="imageCrop" src="" class="img-fluid" alt="Picture" v-show="showCanvas" :style="{display:'block', maxWidth:'100%'}">
      </div>

      <GreenBtn @click="send" id="SendButton" v-if="sendButtonDisplay" class="m-3">
        Send!
      </GreenBtn>
              <!-- This is just a button for sending - feel free to use anything else  -->

  </MiddleCol>

</template>

<style scoped>
/* Make sure the size of the image fits perfectly into the container */
img {
  display: block;
  /* This rule is very important, please don't ignore this */
  max-width: 100%;
}
</style>

<script>
import { toRaw } from 'vue';
import MiddleCol from '../../components/MiddleCol.vue';
import GreenBtn from '../../components/GreenBtn.vue';

export default {
  data() {
    return {
      showFileInput:true,
      showCanvas:false,
      cropperDisplay:'none',
      sendButtonDisplay:false,
      cropper:null,
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
              duration: 30000
            })

        }


        },
        send (){
            this.showFileInput=false
            console.log(toRaw(this.cropper));
            var vm = this; 
            toRaw(this.cropper).getCroppedCanvas().toBlob((blob) => {

                //replace with the API end point u need
                this.axios.postForm( `${import.meta.env.VITE_BACKEND}/item/photo/`, {
                    userPhoto:  blob
                }).then(function (response) {
                // handle success
                vm.$toast.success("Picture successfully uploaded")
                // if okay go to /home
                vm.$router.push(`/item/${this.$route.params.itemId}`)
            }).catch (function (error){
              console.log(error)
              vm.$toast.error("Picture failed to be uploaded")
              vm.$router.push(`/item/${this.$route.params.itemId}`)
            });
            })
        }
    },
    computed : {
  }
  }
</script>