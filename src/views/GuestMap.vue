<script setup>
  import '../../node_modules/leaflet/dist/leaflet.css'
  import L  from 'leaflet'
  import {pinPicture, redPin} from "../assets/assets"
  import MiddleCardForListing from '../components/MiddleCardForListing.vue';
  import * as bootstrap from 'bootstrap'
  import { useLoadStore } from '../store/InitialLoadStore';
  import { mapStores } from 'pinia';
  import GreenBtn from '../components/GreenBtn.vue'


</script>

<template>
  <!-- type your HTML here -->
  <MiddleCardForListing>
    <div class="container-fluid text-center my-4">
      <span style="display: inline;">
        <h1 style="font-size: xxx-large; display: inline-block; margin-right: 15px;">Find items near you!</h1>
      <!-- modal start -->
        <!-- Button trigger modal -->
        <button type="button" data-bs-toggle="modal" data-bs-target="#instructionalModal" style="border: 0; background-color: #eef3db;">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="black" class="bi bi-question-circle" viewBox="0 0 16 16" style="vertical-align:bottom;">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
          </svg>
        </button>
      </span>
      <div class="row mx-3 overflow-auto flex-nowrap justify-content-start">
        <div class="col-xl-2 col-md-3 col-sm-5 col-6" v-for="item in items">
          <ItemCard :item="item">

          </ItemCard>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" ref="instructionalModal" id="instructionalModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Welcome to the map!</h5>

            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div>
              <p><b>Find users near you!</b></p>
              <ol>
                <li>Enter an address or use your current location</li>
                <img src="/src/assets/images/UMap_modal1.gif" style="width: 90%;">
                <br><br>
                <li>Adjust the search radius</li>
                <img src="/src/assets/images/UMap_modal2.gif" style="width: 90%;">
                <br><br>
                <li>Search and view items listed by nearby users</li>
                <img src="/src/assets/images/GMap_modal3.gif" style="width: 90%;">
              </ol>
            </div>
          </div>
          <div class="modal-footer">
            <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> -->
            <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" @click="closeNextTime" v-model="showNextTime">
            <label class="form-check-label" for="flexCheckDefault">
              Do not show again on next visit
            </label>
          </div>
          </div>
        </div>
      </div>
    </div>
    <!-- modal end -->
    <div class="container-fluid">
      <div class="row g-2">
        <div class="col-xxl-9">
          <input type="text" class="form-control-lg col-12" v-model="query" placeholder="Enter an address or a location name (e.g. SMU)">
        </div>
        <div class="col-xxl-1 text-center mt-3"><h2>OR</h2></div>
        <div class="col-xxl-2 text-center">
          <GreenBtn type="button" v-on:click="getLocation()">Use your location</GreenBtn>
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
      showNextTime: false,
      instructionalModal : null,



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

  created(){
    if(localStorage.getItem("GuestMap")==null){
        this.showNextTime=false;
      } else {
        this.showNextTime=true;
      }
  },

  methods: {


    closeNextTime(){
      if(localStorage.getItem("GuestMap")==null){
        localStorage.setItem("GuestMap",true)
      } else {
        localStorage.removeItem("GuestMap")
      }
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

          if (item.usernames.length==1) {
            temp.bindPopup(`${item.usernames.length} user is trading at the bus stop: ${item.busStopName}. Sign up to chat with them!`)

            temp.on('mouseover',function(e){
                this.openPopup()
            }),
            temp.on('mouseout', function(e){
              this.closePopup()
            })
            this.pointsArr.push(temp)
          } else {
            temp.bindPopup(`${item.usernames.length} users are trading at the bus stop: ${item.busStopName}. Sign up to chat with them!`)

            temp.on('mouseover',function(e){
                this.openPopup()
            }),
            temp.on('mouseout', function(e){
              this.closePopup()
            })
            this.pointsArr.push(temp)
          }
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

    
    this.instructionalModal= new bootstrap.Modal(this.$refs.instructionalModal)
    if(localStorage.getItem("GuestMap")==null){
      this.instructionalModal.show()
    }
  },

  computed :{
    ...mapStores(useLoadStore)
  }

    

}
</script>


//