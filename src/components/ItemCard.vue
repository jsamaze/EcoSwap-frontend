<template>
  <div class="card card-block" @click="clickCard" style="cursor: pointer; width: 100%;">
    <img v-lazy="item.photoURLs.length > 0 ? item.photoURLs[0] : placeholder" class="card-img-top w-100 rounded">
    <div class="container p-0">
      <div class="row">
        <h4 class="col card-title subtitle text-truncate mx-3 mt-3">{{ item.itemName }}</h4>
        <span class="col-3 badge text-bg-danger rounded-pill me-4" v-if="item.done">Traded</span>
      </div>
    </div>
    <div class="card-text subtitle text-truncate mx-3 mb-3">
      <span class="subtitleBold">Category:</span> {{ item.category }}<br>
      <span class="subtitleBold">Condition:</span> {{ item.condition }} <br>
      <span class="subtitleBold">Tags:</span> {{ item.tags.length > 0 ? item.tags.join(", ") : "-" }}<br>
      <span class="subtitleBold">Views: </span> {{ item.views }}<br>
      <span class="subtitleBold">Listed by: </span> {{ item.user.username }}<br>
    </div>
  </div>
</template>

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