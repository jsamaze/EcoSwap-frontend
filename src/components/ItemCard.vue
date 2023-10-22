<template>
            <div class="card card-block" @click="clickCard">
            <img :src="item.photoURLs.length > 0 ? item.photoURLs[0] : placeholder" class="card-img-top w-100" alt="...">
            <h5 class="card-title subtitle fs-3 mx-3 mt-3">{{ item.itemName }}</h5>
            <p class="card-text subtitle mx-3 mb-3">
              <span class="subtitleBold">Item category:</span> {{ item.category }}<br>
              <span class="subtitleBold">Item condition:</span> {{ item.condition }} <br>
              <span class="subtitleBold">Item tags:</span> {{ item.tags.join(", ") }}<br>
              <span class="subtitleBold">Views </span> {{ item.views }}<br>
              <span class="subtitleBold">Owner </span> {{ item.user.username }}<br>
            </p>
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