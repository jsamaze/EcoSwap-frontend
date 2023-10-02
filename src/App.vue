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

<style>
/* put CSS here */
  .title {
    font-family: 'Libre Bodoni';
  }
  .subtitle {
    font-family: 'Spectral';
  }
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