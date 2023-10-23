<script setup>
  //import these to access GLOBAL state variables
  import '../../../node_modules/leaflet/dist/leaflet.css'
  import L  from 'leaflet'
  // //this is how you import external css files
  // import "../assets/base.css"
  import {pinPicture} from "../../assets/assets"

</script>

<template>
  <!-- type your HTML here -->
  <main>

    <div class="container-fluid">
      <div class="row">
        <div class="accordion" id="accordionExample">
        <!-- Creating an accordion for each item with a loop -->
        <div class="col-2">
          <div class="accordion" id="accordionExample" style="margin-top: 10px">
            <div class="accordion-item" v-for="({listedItem,wishListItemMatch},idx) in nearbyUserArr">
              <h2 class="accordion-header">
                <button class="accordion-button" :class="{ collapsed: idx >0}" type="button" data-bs-toggle="collapse" v-bind:data-bs-target="'#collapse'+idx">
                  {{listedItem.itemName}}
                </button>
              </h2>
              <div :id="`collapse${idx}`" class="accordion-collapse collapse" :class="{show: idx === 0}" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  <ul>
                    <li v-for="item in wishListItemMatch">{{item.itemName}}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-10">
          <div id="map"></div>
          <!-- Get location of user -->
          <div>
            <button v-on:click="getLocation()">
                Your location
            </button>
            {{ latitude }}, {{ longitude }}
          </div>
        </div>

      </div>
    </div>
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
      map : undefined,
      latitude: undefined,
      longitutde: undefined,
      marker: undefined,
      pointsArr: [],
      emoji: undefined,
      nearbyUserArr: []
    }
  },

  methods: {
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition);
      } else { 
      }
    },

    showPosition(position){

      // bus stop within radius from a pt
      this.axios.get(`${import.meta.env.VITE_BACKEND}/busStop/radius`,{
          params : {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              radiusInKm: 0.5,
          }
      })
      .then(resp=>{
        console.log(resp);
        resp.data.forEach(item => {
          var temp = L.marker([item.loc.coordinates[1],item.loc.coordinates[0]],{icon: this.emoji}).addTo(this.map)
          this.pointsArr.push(temp)
          temp.bindPopup(item.Description)
          temp.on('mouseover',function(e){
              this.openPopup()
          }),
          temp.on('mouseout', function(e){
            this.closePopup()
          })
          
        });
        this.map.flyTo([position.coords.latitude,position.coords.longitude],16)
      
      })




    }

  },

  created() {

    //get nearby user data
    this.axios.get(`${import.meta.env.VITE_BACKEND}/busStop/nearbyListingsRecommended`,{
    params : {
        radiusInKm:5, //MUST GIVE
    }
    }).then(response=>{
      console.log(response);
      this.nearbyUserArr = response.data
    })

  },

  //any ajax call to start is executed here
  mounted() {
    // create an icon 
    this.emoji = L.icon({
      iconUrl: pinPicture,
      iconSize: [38,55],
      iconAnchor: [19,0]
    })


    //put the javascript inside here
    this.map = L.map('map',{tap:false}).setView([1.402382926961625, 103.89701354063448], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        //dont forget to add this in front of map
    }).addTo(this.map);


    // Creates a pointer at specified location (x,y)
    this.marker = L.marker([1.4068217418583884, 103.89997409411617]).addTo(this.map);

    // Creates a circle at specified location (x,y), can be edited
    var circle = L.circle([1.3950128243658293, 103.89281796062534], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
    }).addTo(this.map);

    // Creates a polygon at multiple specified locations [(x,y),(x,y)...]
    var polygon = L.polygon([
    [1.4068217418583884, 103.89997409411617],
    [1.3950128243658293, 103.89281796062534],
    [1.4015769166420673, 103.91617463620193],
    [1.3371686592044003, 103.78213928798633]
    ]).addTo(this.map);

    // Create popups binded to variables that appear when hovered over
    this.marker.bindPopup("<b>Hello world!</b><br>I am the Church of Transfiguration.").openPopup();
    circle.bindPopup("I am a circle in Punggol.");
    polygon.bindPopup("I am a polygon.");

    // Create a popup that is constantly displayed
    var popup = L.popup()
    .setLatLng([1.3860354329444173, 103.90187309806764])
    .setContent("I am a standalone popup.")
    .openOn(this.map);


    //Supposed to have an event occur when map is clicked, however it is not working
    function onMapClick(e) {
      console.log(e)
    alert("You clicked the map at " + e.latlng);
    }

    this.map.on('click', onMapClick);

    // Supposed to show the latitude and longitude when map is clicked, however it is not working
    var popup = L.popup();

    function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(this.map);
    }

    this.map.on('click', onMapClick);


    // Obtain the current location of user


  }

    

}
</script>


//