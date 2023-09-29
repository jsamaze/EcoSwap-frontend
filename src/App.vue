<!-- 3 parts - script, template, style  -->

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>


<template>
  <header>
    This is the top part navigation area. It remains constant
    <hr>
  </header>

  <!-- Replaced by component in /router/index.js -->
  <RouterView />
</template>

<style scoped>
/* put CSS here */

</style>

<script>
export default {
  data() {
    return {
      // vue things go here
    }
  }
}
</script>