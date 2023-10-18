<script setup>
  //import these to access GLOBAL state variables
  import {RouterLink} from 'vue-router'

  import CustomCarousell from '../../components/CustomCarousell.vue'

  import {mapStores} from 'pinia'
  import {useUserStore} from '../../store/UserStore'

import Btn from '../../components/Btn.vue'

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
                        </div>
                        <div class="col">
                            <div class="row mt-5">
                              <div class="col">
                                <h1 class="title">{{itemName}}  <span class="badge background-dark-green float-end">
                                  {{ itemType.split(" ")[0] }}
                                </span></h1>
                               
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
                                  {{ tagsToDisplay }}</span>
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
                                    <h6 class="subtitle">50m away</h6>

                                </div>
                                
                            </div>

                            <!-- display only if the logged in user is the same as item owner -->
                            <div class="row" v-if="username == this.userStore.username">

                                <RouterLink :to="`/item/${this.$route.params.itemId}/edit`" class="btn btn-success btn-lg gradient-custom-4 text-white subtitle my-4 title">Edit Listing</RouterLink>
                            </div>

                            <!-- can start a chat as long as not my own item -->
                            <div class="row" v-if="username != this.userStore.username">
                                <RouterLink :to="`/chat/${this.$route.params.itemId}/${this.username}`" class="btn background-green text-white my-4 title">Start a chat</RouterLink>
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

        if (this.youLike){
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
    tagsToDisplay(){
      return this.tags.join(', ')
    }
  },

  created() {
    var loader = this.$loading.show()

    this.axios.get(`${import.meta.env.VITE_BACKEND}/item/${this.$route.params.itemId}`)
        .then(response => {

            loader.hide()

            this.youLike = response.data.data.userLike ?? false;

             this.condition =response.data.data.condition;
             this.category = response.data.data.category;
             this.description = response.data.data.description;
             this.itemName = response.data.data.itemName;
             this.tags = response.data.data.tags;
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