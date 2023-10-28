<script setup>
  import '../../node_modules/leaflet/dist/leaflet.css'
  import L  from 'leaflet'
  import {pinPicture, redPin} from "../assets/assets"
  import MiddleCardForListing from '../components/MiddleCardForListing.vue';
  import * as bootstrap from 'bootstrap'
  import { useLoadStore } from '../store/InitialLoadStore';
  import { mapStores } from 'pinia';

</script>

<template>
  <!-- type your HTML here -->
  <MiddleCardForListing>
    <h2>See other users near you!</h2>

    <button class="btn btn-success" v-on:click="getLocation()">
          Use your location
      </button>
    <div>
      <form class="mb-3" @submit.prevent="getLocationAddress()">
        <label for="exampleFormControlInput1" class="form-label">Enter an address to find bus stops within 5km</label>
        <input type="text" class="form-control" v-model="query" placeholder="123 Ecoswap Avenue">
        <button class="btn btn-primary">Search</button>
      </form>

      <label for="customRange2" class="form-label">distance from you : {{ radiusInKm }} km</label>
      <input type="range" class="form-range" min="0" max="5" step="0.5" id="customRange2" v-model="radiusInKm">


    </div>
    <div id="map"></div>
  </MiddleCardForListing>


</template>

<style scoped>
/* you can also import css files */
#map { height: 80vh; }
</style>

<script>
export default {

  // this is data, website will reload if this change
  data() {
    return {
      map : undefined,
      latitude: undefined,
      longitutde: undefined,

      pointsArr: [],
      busStopObj : new Map(),
      emoji: L.icon({
        iconUrl: pinPicture,
        iconSize: [38,55],
        iconAnchor: [19,55],
        popupAnchor:  [0, -55] 
      }),

        red: L.icon({
        iconUrl: redPin,
        iconSize: [40,59],
        iconAnchor: [20,59],
        popupAnchor:  [0, -59] 

      }), 
      
      myModal : null,
      selectedBusStop : null,
      popupOpen : false,

      radiusInKm : 2,

      //query
      query : '',

      userPin : null,
    }
  },

  methods: {

    createMap(){
      if(this.map){
        this.map.off()
        this.map.remove()
      }
      this.map = L.map('map').setView([1.366667,103.85], 11);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(this.map);
    },

    putUserMarker(position){
      this.userPin = L.marker([position.coords.latitude, position.coords.longitude], {icon : this.red}
        ).addTo(this.map)
        this.userPin.bindPopup("You are here!")
        this.userPin.openPopup()
      this.map.flyTo([position.coords.latitude, position.coords.longitude],16);

    },

    getLocation() {
      this.createMap()
      this.loadStore.loading=true
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((data) => {
          this.putUserMarker(data)
          this.showPosition(data)
        },(e) =>{
          this.loadStore.loading=false
          this.$toast.warning("You have disabled sharing your location")
        });
      } else { 
        this.$toast.warning("You have disabled sharing your location")
        this.loadStore.loading= false
      }
    },

    async getLocationAddress(){
      this.createMap()
      try {
        this.loadStore.loading=true
        var response = await this.axios.get('https://nominatim.openstreetmap.org/search',{
          params : {
            format : 'json',
            countrycodes : 'SG',
            q : this.query
          },
          withCredentials : false
        })

        if (response.data.length > 0){
          this.query=response.data[0].display_name
          this.showPosition({
          coords : {
            latitude : response.data[0].lat,
            longitude : response.data[0].lon
          }
        })

        this.putUserMarker({
          coords : {
            latitude : response.data[0].lat,
            longitude : response.data[0].lon
          }
        })
        } else {
          this.$toast.error("Did not find any location matching your query")
          this.loadStore.loading=false
        }

      } catch(e){
        this.$toast.error("Error with fetching location data")
        this.loadStore.loading=false
      }
    },

    showPosition(position){

      this.busStopObj = new Map()
      this.pointsArr = []


      // bus stop within radius from a pt
      this.axios.get(`${import.meta.env.VITE_BACKEND}/busStop/nearbyUsers`,{
          params : {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              radiusInKm: this.radiusInKm,
          }
      })
      .then(resp=>{
        this.map.flyTo([position.coords.latitude,position.coords.longitude],14)

        console.log(Object.entries(resp.data));
        Object.entries(resp.data).forEach(([key,item]) => {
          console.log(item)
          if(this.busStopObj.has(item.preferredBusStop)){
            this.busStopObj.get(item.preferredBusStop).usernames.push(item.username)
          }else {
            this.busStopObj.set(
              item.preferredBusStop,

              {
                loc : item.loc,
                usernames : [item.username],
                busStopName : item.busStopName
              }
            )
          }

        })

        this.busStopObj.forEach((item,key,map)=>{
          var temp = L.marker([item.loc.coordinates[1],item.loc.coordinates[0]],{
            icon: this.emoji,
          }).addTo(this.map)

          temp.bindPopup(`${item.usernames.length} users are trading at the bus stop ${item.busStopName}. Sign up to chat with them!`)

          temp.on('mouseover',function(e){
              this.openPopup()
          }),
          temp.on('mouseout', function(e){
            this.closePopup()
          })
          this.pointsArr.push(temp)
        })
      }).catch(
        e=>{
          console.log(e)
          this.$toast.error("Error with fetching location data")
        }
      ).finally(
        () =>{
          this.loadStore.loading=false
        }
      )




    },
    async update() {
      // you need to use this in the methods

      var loader = this.$loading.show()

      var vm = this

      this.axios.patch(`${import.meta.env.VITE_BACKEND}/user`,{
        preferredBusStop : this.selectedBusStop.BusStopCode
      }).then(
        response =>{
          this.$toast.success("Success!")
          this.$router.push("/user/settings")
          loader.hide()
        }
      ).catch (
        e=>{
          console.log(e)
          this.$toast.error("Failed to update bus stop" )
        }
      )
    },

  },


  //any ajax call to start is executed here
  mounted() {
    this.createMap()
  },

  computed :{
    ...mapStores(useLoadStore)
  }

    

}
</script>


//