<script setup>
  import '../../../node_modules/leaflet/dist/leaflet.css'
  import L, { layerGroup }  from 'leaflet'
  import {pinPicture, redPin} from "../../assets/assets"
  import MiddleCardForListing from '../../components/MiddleCardForListing.vue';
  import * as bootstrap from 'bootstrap'
  import { useLoadStore } from '../../store/InitialLoadStore';
  import { mapStores } from 'pinia';
  import GreenBtn from '../../components/GreenBtn.vue';

</script>

<template>
  <!-- type your HTML here -->
  <MiddleCardForListing>
    <div class="container-fluid text-center my-4">
      <h1 style="font-size: xxx-large;">Set your preferred bus stop!</h1>
    </div>

    <div class="container-fluid">
      <div class="row g-2">
        <div class="col-xxl-9">
          <input type="text" class="form-control-lg col-12" v-model="query" placeholder="Enter a location here...">
        </div>
        <div class="col-xxl-1 text-center mt-3"><h2>OR</h2></div>
        <div class="col-xxl-2 text-center">
          <GreenBtn v-on:click="getLocation()">Use your location</GreenBtn>
        </div>
      </div>
    </div>
    <br>

    <div class="container-fluid">
      <div class="row">
        <label for="customRange2" class="form-label">
          <h3><b>Distance from chosen location: </b><span style="color: green;">{{ radiusInKm }}</span> km </h3>
          <input type="range" class="form-range" min="0" max="5" step="0.5" id="customRange2" v-model="radiusInKm"></label>
      </div>
    </div>

    <form class="mb-3" @submit.prevent="getLocationAddress()">
      <div class="text-center">
        <button class="btn btn-success btn-lg">Search 
          <!-- Magnifying glass icon for search button-->
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
        </button>
      </div>
    </form>

    <div id="map"></div>
  </MiddleCardForListing>

  <div class="modal fade" ref="myModal" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Confirmation</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Set your preferred bus stop to {{ selectedBusStop?.Description }}?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="update">Confirm</button>
      </div>
    </div>
  </div>
</div>


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
      busStopObj : {},
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

      busStopLayer : null,
      

      myModal : null,
      selectedBusStop : null,

      //query
      query : '',

      radiusInKm : 2,

      userPin:null,
    }
  },

  methods: {
    getLocation() {
      this.createMap()
      this.loadStore.loading=true
      
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((data) => {
          this.showPosition(data)
          this.putUserMarker(data)
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
      this.busStopObj = {}
      // this.pointsArr.forEach(
      //   e => {
      //     if (this.map.hasLayer(e)) {
      //         this.map.removeLayer(e);
      //     }
      //   }
      // )

      // if(this.busStopLayer){
      //   this.busStopLayer.clearLayers();
      // }
      this.pointsArr = []

      this.busStopLayer = L.layerGroup().addTo(this.map);

      // bus stop within radius from a pt
      this.axios.get(`${import.meta.env.VITE_BACKEND}/busStop/radius`,{
          params : {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              radiusInKm: this.radiusInKm,
          }
      })
      .then(resp=>{
        console.log(resp);
        resp.data.forEach(item => {
          var temp = L.marker([item.loc.coordinates[1],item.loc.coordinates[0]],{
            icon: this.emoji,
            busStopCode: item.BusStopCode
          }).addTo(this.busStopLayer)
          this.pointsArr.push(temp)
          var vm = this;
          temp.bindPopup(item.Description)
          temp.on('mouseover',function(e){
              this.openPopup()
          }),
          temp.on('mouseout', function(e){
            this.closePopup()
          })
          
          temp.on('click', function(e){
            console.log(e.target.options.busStopCode)
            vm.selectedBusStop = vm.busStopObj[e.target.options.busStopCode]
            vm.myModal.show()
          })

          this.busStopObj[item.BusStopCode] = item
        });
        this.map.flyTo([position.coords.latitude,position.coords.longitude],15)
        this.$toast.info("Click on the markers to choose",{
          timeout : 5000
        })
      }).catch(
        e=>{
          this.$toast.error("Error with fetching location data")
        }
      ).finally(
        () =>{
          this.loadStore.loading=false
        }
      )




    },

    putUserMarker(position){

        this.userPin = L.marker([position.coords.latitude, position.coords.longitude], {icon : this.red}
        ).addTo(this.map)
        this.userPin.bindPopup("You are here!")
        this.userPin.openPopup()
      this.map.flyTo([position.coords.latitude, position.coords.longitude],16);

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
    }

  },


  //any ajax call to start is executed here
  mounted() {
    this. myModal = new bootstrap.Modal(this.$refs.myModal)
    this.createMap()

  },

  computed :{
    ...mapStores(useLoadStore)
  }

    

}
</script>


//