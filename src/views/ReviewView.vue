<script setup>
  //import these to access GLOBAL state variables
import {RouterLink} from 'vue-router'
import TextInput from '../components/TextInput.vue';
import Btn from '../components/Btn.vue';
import GreenBtn from '../components/GreenBtn.vue';
import GreenSubmitBtn from '../components/GreenSubmitBtn.vue';

import { Form as VeeForm } from 'vee-validate'

import * as yup from 'yup'

import { getActivePinia, mapStores } from 'pinia';
import { useUserStore } from '../store/UserStore';
import MiddleCardForListing from '../components/MiddleCardForListing.vue';
import { placeholder } from '../assets/assets';
import { userStore } from '../main';
import moment from 'moment';
import { useLoadStore } from '../store/InitialLoadStore';

  // //this is how you import external css files
  // import "../assets/base.css"

</script>

<template>
  <!-- type your HTML here -->


   <MiddleCardForListing class="">
 

    <div class="container-fluid">
      <div class="row justify-content-start m-3">
        <Btn style="margin: 0 !important; width: fit-content;" @click="$router.push(this.$router.go(-1))">
          Back
        </Btn>
      </div>
      <div class="row m-1">
        <h3>
          {{ $route.params.username }}'s rating: <span class="normal">{{ avgRating != null ? avgRating + ' out of 5' : 'No reviews yet'}} </span>
        </h3>

        <div v-if="userStore.username==$route.params.username||userStore.username == username">
            <h5 v-if="uncompletedReviews.length == 1">
              You have 1 incomplete review!
            </h5>

            <h5 v-else-if="uncompletedReviews.length == 0">
              No incomplete reviews!
            </h5>

            <h5 v-else>
              You have {{ uncompletedReviews.length }} incomplete reviews!
            </h5>
        </div>

        <div class="review row m-3">

          <div class="col drop">
            <select v-model="selectedOption" class="p-2 select btn btn-lg w-100" >
              <option value="received">Reviews {{ $route.params.username }} received</option>
              <option value="given">Reviews {{ $route.params.username }} wrote</option>
              <option value="incomplete" v-if="userStore.username==$route.params.username||userStore.username == username">Incomplete reviews</option>
            </select>
          </div>



        </div>


        
      <transition-slide>
        <div class='col-12 justify-content-center' v-if="selectedOption =='received'">
            <div class="white py-3">

              
                <!-- <h3>Reviews {{ $route.params.username }} received</h3> -->
                
                
                <div class="card" style="width: 100%; height: auto;">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item " v-for="review in reviews">
                        <b>Review from: </b>{{ review.by.username }}
                        <br><b>Written on: </b>{{ moment(review.updatedAt).format("DD/MM/YYYY") }}
                        <br><b>Deal closed on: </b>{{ moment(review.createdAt).format("DD/MM/YYYY") }}
                        <br><b>Rating: </b>{{ review.rating }} out of 5
                        <br><b>Comment: </b>"{{ review.textContent }}"
                    </li>
                    <li class="list-group-item" v-if="reviews.length == 0">
                      No reviews!
                    </li>

                </ul>
                </div>

            </div>

      </div>
    </transition-slide>

      <transition-slide>
      <div class="col-12 justify-content-center"  v-if="selectedOption =='given'">
        <div class="white py-3">

        <!-- <h3>Reviews {{ $route.params.username }} wrote</h3> -->
                
                <div class="card" style="width: 100%; height: auto;">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item " v-for="review in completedReviews" >
                      <b>Review for: </b> {{ review.for.username }}
                      <br><b>Written on: </b>{{ moment(review.updatedAt).format("DD/MM/YYYY") }}
                      <br><b>Deal closed on: </b>{{ moment(review.createdAt).format("DD/MM/YYYY") }}

                      <br><b>Rating: </b>{{ review.rating }} out of 5
                      <br><b>Comment: </b> "{{ review.textContent }}"
                    </li>
                    <li class="list-group-item" v-if="completedReviews.length == 0">
                      No reviews!
                    </li>
                </ul>
            </div>
      </div>

      </div>
    </transition-slide>
        <!-- hide this column if its not my reviews -->
        <transition-slide>

        <div class='col-12  justify-content-center' v-if="(userStore.username == $route.params.username || userStore.username == username) && selectedOption =='incomplete'">
          <div class="white py-3">
            <!-- <h3>Uncompleted Reviews</h3> -->

            <div class="card" style="width: 100%; height: auto;">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item" v-for="review in uncompletedReviews">
                        <b>For user: </b>{{ review.for.username}}
                        <b><br>Date of transaction: </b>{{ moment(review.chat.createdAt).format("DD/MM/YYYY") }}

                        <br> 
                        <GreenBtn data-bs-toggle="modal" data-bs-target="#exampleModal" @click="selectedReview=review">Write review</GreenBtn>

                       
                    </li>
                    <li class="list-group-item" v-if="uncompletedReviews.length == 0">
                      No reviews!
                    </li>
                </ul>
                </div>

    

        </div>
        
      </div>
    </transition-slide>

    </div>

</div>

   </MiddleCardForListing>

<!-- modal -->
   <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Write a review</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <VeeForm v-slot="{ handleSubmit, values }" ref="form" :validation-schema="schema" as="div" class="pb-3">
        <form @submit="handleSubmit($event, sendReview)">

          <select class="form-select" v-model="rating">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

      <div class="modal-body">
        For user: {{ selectedReview.for.username}}
      <br>Date of transaction: {{ moment(selectedReview.chat.createdAt).format("DD/MM/YYYY") }}


          <TextInput as="textarea" name="textContent">
            Content
          </TextInput>
          <!-- {{ values }} -->
      </div>
      <div class="modal-footer">
        <button type="button" @click.prevent class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <input type="submit" class="btn btn-success" value="Save changes" :disabled="!values.textContent" data-bs-dismiss="modal"/>
      </div>
    </form>
      </VeeForm>
    </div>
  </div>
</div>
</template>

<style scoped> 
.select{
  background-color: #d2e296;
  width: 50%; 
}



.normal {
    font-weight: normal; /* Set the font weight to normal to unbold the text */
  }

  .review{
    display: flex;
    align-items: center; 
  }

.heading{
  padding-right: 50px;
}

</style>

<script>
export default {
  props : ['username'],
  data(){
    return {
      selectedOption: "received",

      uncompletedReviews :[],
      completedReviews : [],

      reviews : [],
      avgRating : 0,

      selectedReview : {
        chat : { createdAt : 0},
        for : {username : ""}
      },
      rating:5,

      schema : {
        textContent : yup.string().required("Please fill in the review")
      }
    }
  },
  computed : {
    ...mapStores(useUserStore, useLoadStore)
  },


  methods : {
    sendReview(values){
      values.reviewId = this.selectedReview._id
      values.rating = this.rating

      this.loadStore.loading=true

      this.axios.post(`${import.meta.env.VITE_BACKEND}/chatReview`, values).then(
        response => {
          this.$toast.success("Successfully published review!")
          this.load()
        }
      ).catch(
        e => {
          console.log(e)
          this.$toast.error("Failed to post review")
        }
      ).finally(
        ()=> {this.loadStore.loading=false}
      )
    },
    async load(){
      this.loadStore.loading = true
      try {
        if (this.userStore.username == this.$route.params.username){
          var ajax1 = await this.axios.get( `${import.meta.env.VITE_BACKEND}/chatReview`)
          this.uncompletedReviews = ajax1.data.data
        }
        var ajax2 = await this.axios.get(`${import.meta.env.VITE_BACKEND}/user/${ this.username||this.$route.params.username}`)
        this.reviews = ajax2.data.data.reviewsReceived
        this.completedReviews = ajax2.data.data.reviewsWritten
        this.avgRating = ajax2.data.data.avgRating 
      } catch (error) {
        console.log(error)
        this.$router.push("/")
      } finally {
        this.loadStore.loading = false
      }
    }
  },


  //any ajax call to start is executed here
  created() {
    this.load()
  }
}
</script>