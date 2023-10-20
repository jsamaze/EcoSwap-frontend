<script setup>
  //import these to access GLOBAL state variables
  import {RouterLink} from 'vue-router'

  import CustomCarousell from '../../components/CustomCarousell.vue'

  import {mapStores} from 'pinia'
  import {useUserStore} from '../../store/UserStore'

import Btn from '../../components/Btn.vue'
import MiddleCardForListing from '../../components/MiddleCardForListing.vue'
import GreenBtn from '../../components/GreenBtn.vue'

  // //this is how you import external css files
  // import "../assets/base.css"

</script>

<template>
  <!-- type your HTML here -->

    <MiddleCardForListing>
      <div class="row">


          <div class="col-sm-6">
    
            <Btn @click="this.$router.go(-1)">
              Back
            </Btn>

              <br>
              <CustomCarousell v-if="images && images.length>0" :images=images>

              </CustomCarousell>

          </div>
                        <div class="col-sm-6">

                          <div class="row mt-5">
                            <div class="col">
                              <span class="badge background-dark-green float-end fs-4">
                                {{ itemType }}
                              </span>
                              <h1 class="title">{{itemName}}  </h1>
                              
                            </div>  
                            </div>

                            <div class="row">
                                <span class="subtitle">
                                <span class="subtitle">Category:</span>
                                {{category}}</span>
                            </div>

                            <div class="row">
                                <span class="subtitle">
                                <span class="subtitle">Condition:</span>
                                {{ condition }}</span>
                            </div>

                            <div class="row">
                                <span class="subtitle">
                                <span class="subtitle">Tags:</span>
                                  {{ tags }}</span>
                            </div>

                            <br>

                            <div class="row">
                                <p class="subtitle">
                                <span class="subtitle">Desciption:</span>
                                {{description}}</p>
                            </div>

                            <div class="row">
                              <p>No of views : {{ views }}</p>
                              <span><button class="btn btn-warning" @click="likeOrDislike">
                                        {{ youLike ? "dislike" : "like" }}
                                     </button> {{ likes }}</span> 
                            </div>

                            
                            <br>
                            <div class="row">
                                
                                <h6 class="title">Listed by:</h6>
                            </div>

                            <div class="row">
                                <div class="col-2">
                                  <img class="w-100" :src="userPhotoURL" v-if="!!userPhotoURL">
                                </div>

                                <div class="col-10">
                                    <h6 class="subtitle">{{ username }}</h6>
                                    <h6 class="subtitle">Preferred bus stop: {{ preferredBusStop }}</h6>
                                    <!-- <h6 class="subtitle">50m away</h6> -->

                                </div>
                                
                            </div>

                            <div class="row" v-if="username == userStore.username">
                              <RouterLink :to="`/item/${$route.params.itemId}/edit`">
                                <GreenBtn >
                                    Edit Listing
                                  </GreenBtn>
                              </RouterLink>

                            </div>


                            <div class="row" v-if="username != userStore.username && itemType != 'WishList'">
                                <RouterLink :to="`/chat/${$route.params.itemId}`">
                                  <GreenBtn>
                                    StartChat
                                  </GreenBtn>
                                </RouterLink>
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

      itemType : "",

      condition : "",
      category : "",
      description : "",
      itemName : "",
      username : "",
      preferredBusStop: "",
      tags: "",

      views:null,
      likes: null,

      youLike: false,

      images: null,

      userPhotoURL : null,


    }
  },

  methods: {
    async likeOrDislike(){
      this.youLike = !this.youLike
      this.youLike ? this.likes++ : this.likes--
      try { 

        if (!this.youLike){
          var response = await this.axios.delete(`${import.meta.env.VITE_BACKEND}/item/like/${this.$route.params.itemId}`)
        } else {
          var response = await this.axios.post(`${import.meta.env.VITE_BACKEND}/item/like/${this.$route.params.itemId}`)
        }


      } catch (e){
        this.$toast.warning("issue with liking item")
        console.log(e)
        this.youLike = !this.youLike
      this.youLike ? this.likes++ : this.likes--
      }
    },
    getOwnerPhoto(){
      this.axios.get(`${import.meta.env.VITE_BACKEND}/user/${this.username}`).then(response =>{
        this.userPhotoURL = response.data.data.imageURL
      }).catch(error=>{
        this.$toast.warning("Failed to fetch owner photo")
      })
    }
  },

  computed : {
    ...mapStores(useUserStore),
    // tagsToDisplay(){
    //   return this.tags.join(', ')
    // }
  },

  created() {

    // this.$watch(
    //   () => this.$route.params.itemId,
    //   (toParams, previousParams) => {
    //     console.log("cat")
    //     this.$router.go(0)
    //   }
    // )

    var loader = this.$loading.show()

    this.axios.get(`${import.meta.env.VITE_BACKEND}/item/${this.$route.params.itemId}`)
        .then(response => {

            loader.hide()

            this.youLike = response.data.data.userLike ?? false;

             this.condition =response.data.data.condition;
             this.category = response.data.data.category;
             this.description = response.data.data.description;
             this.itemName = response.data.data.itemName;
             this.tags = response.data.data.tags.join(", ");

             console.log(response.data.data)
             this.images = response.data.data.photoURL.length > 0 ? response.data.data.photoURL : ["/src/assets/images/scott-lord-PiqZfESKt3k-unsplash.jpg"];
             this.itemType = response.data.data.itemType;

             this.likes = response.data.data.noOfLikes;
             this.views = response.data.data.views

             this.username =response.data.data.user.username;
             this.preferredBusStop=response.data.data.user.preferredBusStop;

             console.log(response.data);
            console.log(response.data.data.user.username)

            this.getOwnerPhoto()
        })
        .catch( error => {
            console.log(error);
            this.$toast.error("Item loading error!")
            this.$router.go(-1)
        });
    
    
  }
}


</script>