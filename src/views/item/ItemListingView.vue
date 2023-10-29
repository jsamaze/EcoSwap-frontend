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
import { placeholder, userPlaceholder } from '../../assets/assets'
import * as bootstrap from 'bootstrap'
</script>

<template>
  <!-- type your HTML here -->

<MiddleCardForListing>
  <div class="row justify-content-start m-3">
    <Btn style="margin: 0 !important; width: fit-content;" @click="$router.push('/user/marketplace')" v-if="userStore.username != username">
      Back
    </Btn>
    <Btn style="margin: 0 !important; width: fit-content;" @click="$router.push(`/user/${username}`)" v-else>
      Back
    </Btn>
  </div>
  <div class="row align-items-start mt-4">
    <div class="col-sm-6 mb-3">
        <CustomCarousell v-if="images && images.length>0" :images=images>
        </CustomCarousell>
    </div>
    <div class="col-sm-6">

      <div class="row justify-content-start">
        <h1 class="title">{{itemName}} <span class="badge text-bg-danger rounded-pill ms-1" v-if="done">Traded</span></h1>
        <p class="badge background-dark-green fs-4" style="width: fit-content; margin-left: 12px;"> {{ itemType }}</p>
        <div class="row align-items-start">
          <div class="col">
            <button  v-if="userStore.username && username != userStore.username" class="btn" style="background-color: transparent;" @click="likeOrDislike" >
              <img v-if="!youLike" style="height : 3rem;" src="../../assets/images/like.png">
              <img v-else style="height : 3rem;" src="../../assets/images/unlike.png">
            </button>
          </div>
        </div>
        <span class="subtitle"><span class="subtitleBold">Category:</span> {{category}}</span>
        <span class="subtitle text-capitalize"><span class="subtitleBold">Condition:</span> {{ condition }}</span>
        <span class="subtitle"><span class="subtitleBold">Tags:</span> {{ tags }}</span>
        <p class="subtitle"><span class="subtitleBold">Description:</span>
        <br>
        {{description}}</p>
        <p><span class="subtitleBold" ref="viewsHelp" data-bs-toggle="tooltip" :data-bs-title="userStore.username ? 'Only views 5 minutes apart from each other count':'Log in for your view to count!'">No of views:</span> {{ views }}</p>
        <p><span class="subtitleBold">Number of likes: </span> {{ likes }}</p>
        <h6 class="titleBold">Listed by:</h6>
        <div class="col-md-2 col-3 align-self-center">
          <img :src="userPhotoURL" v-if="!!userPhotoURL">
        </div>
        <div class="col">
          <RouterLink :to="userStore.username ? `/user/${username}` : ``">
            <h6 class="subtitle">
              <span ref="username" data-bs-toggle="tooltip" data-bs-title="Log in to see more information!">{{ username }}</span>
            </h6>
          </RouterLink>
            <h6 class="subtitle">Preferred bus stop: {{ preferredBusStop }}</h6>
        </div>
      </div>
        <div class="row" style="width: fit-content; margin: auto;" v-if="username == userStore.username">
          <RouterLink :to="`/item/${$route.params.itemId}/edit`">
              <GreenBtn>Edit listing</GreenBtn>
            </RouterLink>
        </div>
        <div class="row" style="width: fit-content; margin: auto;" v-if="userStore.username && username != userStore.username && itemType != 'WishList' && !done">
              <GreenBtn @click="startChat">
                Start chat!
              </GreenBtn>
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
      itemId : 0,
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

      popover : null,

      done: null,

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
    getOwnerPhoto(l){
      let load = l ?? this.$loading.show()
      this.axios.get(`${import.meta.env.VITE_BACKEND}/user/${this.username}`).then(response =>{
        console.log(response)
        this.userPhotoURL = response.data.data.imageURL.length > 0 ? response.data.data.imageURL : userPlaceholder
        this.preferredBusStop = response.data.data.busStop.Description ?? "not set yet"
      }).catch(error=>{
        console.log(error)
        this.$toast.warning("Failed to fetch owner photo")
        this.userPhotoURL = placeholder

      }).finally(
        ()=> l.hide()
      )
    },
    startChat(){
      var loader = this.$loading.show()

      this.axios.post(`${import.meta.env.VITE_BACKEND}/chat/user/${this.username}`,{
        itemId : this.itemId
      }).then(
        (response) =>{
          this.$toast.success(`Successfully started chat with ${this.username}`)
          this.$router.push(`/chat/${response.data.chatId}`)
        }).catch(
          error =>{
            console.log(error)
            this.$toast.warning(error.response.data.problem)
          }
        ).finally(

          ()=> {
            loader.hide()
          }
        )
    },
  },

  computed : {
    ...mapStores(useUserStore),
    // tagsToDisplay(){
    //   return this.tags.join(', ')
    // }
  },



  mounted() {

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
          this.username =response.data.data.user.username;

            this.getOwnerPhoto(loader)

            this.youLike = response.data.data.userLike ?? false;

            this.itemId = response.data.data._id

            this.condition =response.data.data.condition;
            this.category = response.data.data.category;
            this.description = response.data.data.description;
            this.itemName = response.data.data.itemName;
            this.tags = response.data.data.tags.join(", ");

            this.images = response.data.data.photoURL.length > 0 ? response.data.data.photoURL : [placeholder];
            this.itemType = response.data.data.itemType;

            this.likes = response.data.data.noOfLikes;
            this.views = response.data.data.views

            this.done=response.data.data.done

            console.log(response.data);
            console.log(response.data.data.user.username)

        })
        .catch( error => {
            console.log(error);
            this.$toast.error("Item loading error!")
            this.$router.go(-1)
        });

    if(!this.userStore.username){
      this.popover = new bootstrap.Tooltip(this.$refs.username)
    }

    this.popover2 = new bootstrap.Tooltip(this.$refs.viewsHelp)
  
  },

}

</script>