<!-- 3 parts - script, template, style  -->

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>


<template>
  <header>
    <nav class=" navbar navbar-expand-lg navbar background-green">
  <a class="  navbar-brand subtitle text-white" href="#">EcoSwap</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav ms-auto">
      <a class="nav-item nav-link active subtitle text-white" href="#">Home <span class="sr-only"></span></a>
      <a class="nav-item nav-link subtitle text-white" href="#">Marketplace</a>
      <a class="nav-item nav-link subtitle text-white" href="#">Map</a>
      <a class="nav-item nav-link float-right subtitle text-white" href="#">Account Settings</a>
    </div>
  </div>
</nav>


  </header>

  <!-- Replaced by component in /router/index.js -->
  <RouterView />

  <footer class="background text-center text-lg-start">
  <!-- Copyright -->
  <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);"> © 2023 EcoSwap
  </div>

  <!-- Copyright -->
</footer>
</template>

<style>
/* put CSS here */
  .title {
    font-family: 'Libre Bodoni';
  }
  .subtitle {
    font-family: 'Spectral';
  }
  .subtitlebold {
    font-weight: bold;
  }
  .whitefont {
    color: #ffffff;
  }
  .green1font {
    color: #eef3db;
  }
  .green2font {
    color: #d2e296;
  }
  .green3font {
    color: #8a9f53;
  }
  .green4font {
    color: #748e1e;
  }
  .green5font {
    color: #2a5717;
  }
  .green6font{
    color: #41571e;
  }
  .background{
    background-color: #eef3db;  
  }
  .heading{
    font-size: 100px;
  }
  .background-dark-green{
    background-color: #2a5717;
  }
  .background-green{
    background-color: #8a9f53;
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