<template>
  <div class="card card-block" @click="clickCard" style="cursor: pointer; width: 100%;">
    <img v-lazy="item.photoURLs.length > 0 ? item.photoURLs[0] : placeholder" class="card-img-top w-100 rounded">
    <span class="badge text-bg-danger rounded-pill position-absolute fs-5 right-0 top-0" v-if="item.done">Traded</span>
    <div class="container p-0">
      <div class="row">
        <h4 class="col card-title subtitle mx-3 mt-3 twoLines" id="itemname">

          {{ item.itemName }}
        </h4>
      </div>
    </div>
    <div class="card-text subtitle text-truncate  mx-3 text-capitalize mb-2">
        {{ item.condition }} 
        
        <br class="d-inline d-sm-none"> 
        
        {{ item.category }}<br>
    </div>

    <div class="d-none d-sm-inline mx-3 twoLines">
      <span class="subtitleBold">Tags:</span> <span></span> {{ item.tags.length > 0 ? item.tags.join(", ") : "-" }}
    </div>
    <div class="card-text subtitle text-truncate mx-3 mb-3">
      <span class="subtitleBold">Views: </span> {{ item.views }}<br>
      <span class="subtitleBold">By: </span> {{ item.user.username }}<br>
    </div>
  </div>
</template>

<style scoped>
.twoLines {
  
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;

  height: 2.3em;
  line-height: 1.1;
  }


@media (max-width: 576px) {
  .twoLines {


    display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;  
  overflow: hidden;

  height: 4.5em;
  line-height:1.1;


  }
}
</style>

<script>
import {placeholder} from '../assets/assets'
export default {
    props : ["item"],
    data() {
      return {
        placeholder : placeholder
      }
    },
    methods : {
        clickCard(){
            this.$router.push(`/item/${this.item._id}`)
        }
    }
}
</script>