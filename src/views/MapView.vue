<script setup>
  //import these to access GLOBAL state variables
  import '../../node_modules/leaflet/dist/leaflet.css'
  import L  from 'leaflet'
  // //this is how you import external css files
  // import "../assets/base.css"


</script>

<template>
  <!-- type your HTML here -->
  <main>

    <div id="map"></div>

  </main>
</template>

<style>
/* you can also import css files */
#map { height: 180px; }
</style>

<script>
export default {

  // this is data, website will reload if this change
  data() {
    return {
      map : undefined
    }
  },

  methods: {

  },


  //any ajax call to start is executed here
  mounted() {
    this.map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
  }
}
</script>