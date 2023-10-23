<script setup>
  //import these to access GLOBAL state variables
import {RouterLink} from 'vue-router'
import TextInput from '../components/TextInput.vue';
import GreenBtn from '../components/GreenBtn.vue';
import GreenSubmitBtn from '../components/GreenSubmitBtn.vue';

import { Form as VeeForm } from 'vee-validate'

import * as yup from 'yup'

import { mapStores } from 'pinia';
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


   <MiddleCardForListing>
    
    <div class="container-fluid">
      <div class="row m-5">
        
        
        <div class='col justify-content-center'>
            <div class="white p-3">
                <h3>Reviews {{ $route.params.username }} got</h3>
                
                <div class="card" style="width: 100%; height: auto;">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item " v-for="review in reviews">
                        Review from {{ review.by.username }}
                        written on {{ moment(review.updatedAt).format("DD/MM/YYYY") }}
                        for chat closed on {{ moment(review.createdAt).format("DD/MM/YYYY") }}
                        <br>Rating: {{ review.rating }} out of 5
                        <br>Comment: "{{ review.textContent }}"
                    </li>
                    <li class="list-group-item" v-if="reviews.length == 0">
                      Empty
                    </li>

                </ul>
                </div>

            </div>

            <h3>Reviews {{ $route.params.username }} wrote</h3>
                
                <div class="card" style="width: 100%; height: auto;">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item " v-for="review in completedReviews" >
                        Review for {{ review.for.username }}
                        written on {{ moment(review.updatedAt).format("DD/MM/YYYY") }}
                        for chat closed on {{ moment(review.createdAt).format("DD/MM/YYYY") }}

                        <br>Rating: {{ review.rating }} out of 5
                        <br>Comment: "{{ review.textContent }}"
                    </li>
                    <li class="list-group-item" v-if="completedReviews.length == 0">
                      Empty
                    </li>
                </ul>
                </div>
            
            
                
            
            
            

      </div>
        <!-- hide this column if its not my reviews -->
        <div class='col  justify-content-center' v-if="userStore.username == $route.params.username">
          <div class="white p-3">
            <h3>Uncompleted Reviews</h3>

            <div class="card" style="width: 100%; height: auto;">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item" v-for="review in uncompletedReviews">
                        For user: {{ review.for.username}}
                        <br>Date of transaction:{{ moment(review.chat.createdAt).format("DD/MM/YYYY") }}

                        <br> 
                        <GreenBtn data-bs-toggle="modal" data-bs-target="#exampleModal" @click="selectedReview=review">Write review</GreenBtn>

                       
                    </li>
                    <li class="list-group-item" v-if="uncompletedReviews.length == 0">
                      Empty
                    </li>
                </ul>
                </div>

    

        </div>
        
      </div>
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
      <br>Date of transaction:{{ moment(selectedReview.chat.createdAt).format("DD/MM/YYYY") }}


          <TextInput as="textarea" name="textContent">
            Content
          </TextInput>
          <!-- {{ values }} -->
      </div>
      <div class="modal-footer">
        <button type="button" @click.prevent class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <input type="submit" class="btn btn-success" value="Save changes" v-if="values.textContent" data-bs-dismiss="modal"/>
      </div>
    </form>
      </VeeForm>
    </div>
  </div>
</div>
</template>

<style scoped> 



</style>

<script>
export default {
  data(){
    return {
      uncompletedReviews :[],
      completedReviews : [],

      reviews : [],

      selectedReview : {
        chat : { createdAt : 0},
        for : {username : ""}
      },
      rating:0,

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
        var ajax2 = await this.axios.get(`${import.meta.env.VITE_BACKEND}/user/${this.$route.params.username}`)
        this.reviews = ajax2.data.data.reviewsReceived
        this.completedReviews = ajax2.data.data.reviewsWritten
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