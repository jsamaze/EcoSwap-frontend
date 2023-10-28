<template>
  <div class="card card-block" @click="clickCard" style="cursor: pointer; width: 100%;">
    <span class="badge text-bg-danger position-absolute " v-if="item.done">Traded</span>
    <img v-lazy="item.photoURLs.length > 0 ? item.photoURLs[0] : placeholder" class="card-img-top w-100 rounded">
    <h4 class="card-title subtitle text-truncate mx-3 mt-3">{{ item.itemName }}</h4>
    <div class="card-text subtitle text-truncate mx-3 mb-3">
      <span class="subtitleBold">Category:</span> {{ item.category }}<br>
      <span class="subtitleBold">Condition:</span> {{ item.condition }} <br>
      <span class="subtitleBold">Tags:</span> {{ item.tags.slice(0,2).join(", ") }}<br>
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