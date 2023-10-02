<!-- 3 parts - script, template, style  -->

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>


<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">EcoSwap</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">
      <a class="nav-item nav-link active" href="#">Home <span class="sr-only"></span></a>
      <a class="nav-item nav-link" href="#">Marketplace</a>
      <a class="nav-item nav-link" href="#">Map</a>
      
    </div>
  </div>
</nav>
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