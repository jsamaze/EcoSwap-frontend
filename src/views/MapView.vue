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
    <div class="container">
        <div id="map"></div>
    </div>

  </main>
</template>

<style scoped>
/* you can also import css files */
#map { height: 100vh; }
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

    //put the javascript inside here
    this.map = L.map('map').setView([1.402382926961625, 103.89701354063448], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        //dont forget to add this in front of map
    }).addTo(this.map);
  }
}
</script>