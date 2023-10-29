<script setup>
  //import these to access GLOBAL state variables
  import '../../../node_modules/leaflet/dist/leaflet.css'
  import L, { layerGroup } from 'leaflet'
  // //this is how you import external css files
  // import "../assets/base.css"
  import {pinPicture, redPin} from "../../assets/assets"
  import MiddleCardForListing from "../../components/MiddleCardForListing.vue";
  import {RouterLink} from "vue-router"
  import { useLoadStore } from '../../store/InitialLoadStore'
  import { mapStores } from 'pinia'
  import { useUserStore } from '../../store/UserStore'
  import GreenBtn from '../../components/GreenBtn.vue'

</script>

<template>
  <!-- type your HTML here -->
  
  <MiddleCardForListing>
    <div class="container-fluid text-center my-4">
      <h1 style="font-size: xxx-large;">Find items near you!</h1>
    </div>


      <form class="mb-3 " @submit.prevent="getLocationAddress()">

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
              <input type="range" class="form-range" min="0" max="5" step="0.5" id="customRange2" v-model="radiusInKm">
            </label>
          </div>
        </div>

        <div class="text-center">
          <button class="btn btn-success btn-lg">Search 
            <!-- Magnifying glass icon for search button-->
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </button>
        </div>

      </form>
      
      <button class="btn btn-dark mb-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
        View recommended items!
      </button>


    <div id="map"></div>
    <!-- Get location of user fly to it-->

  </MiddleCardForListing>

    <!-- offcanvas -->
    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
      <div class="offcanvas-header">        
        <h5 class="offcanvas-title mx-auto" id="offcanvasExampleLabel">
          <h3 class="titleBold">
            Recommended Items
            <button type="button" class="btn btn-lg btn-close align-self-end mx-2" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </h3>
        </h5>
      </div>

      <div class="offcanvas-body">  

        <!-- If no items are recommended-->
        <div v-if="nearbyUserArr.length==0">
          There is no item to recommend nearby. Try choosing another location, or adding more items to your wishlist!
        </div>

          <!-- Creating an accordion for each item with a loop -->
          <div class="accordion" id="accordionExample">
            <div class="accordion" id="accordionExample" style="margin-top: 10px">
              <div class="accordion-item" v-for="({listedItem,wishListItemMatch},idx) in nearbyUserArr">
                <h2 class="accordion-header">
                  <button class="accordion-button" :class="{ collapsed: idx >0}" type="button" data-bs-toggle="collapse" v-bind:data-bs-target="'#collapse'+idx" @click="findItemOwner(listedItem)">
                    <!-- later remove the link, use event listener to move to point on map where item Owner is -->
                    <div class="row">
                      <!-- Wondering how to add the photos here -->
                      <div><img v-if="listedItem.photoURLs.length!=0" v-lazy="listedItem.photoURLs[0]" style="width: 50%; height: 50%; margin-bottom: 5px;" class="rounded"/></div>
                      <div><h4 class="text-capitalize">{{listedItem.itemName}}</h4></div>
                      <div v-if="listedItem.category"><b>Category:</b> {{listedItem.category}}</div>
                      <div v-if="listedItem.condition" class="text-capitalize"><b>Condition:</b> {{listedItem.condition}}</div>
                      <div v-if="listedItem.description"><b>Description:</b> {{listedItem.description}}</div>
                    </div>
                  </button>
                </h2>
                <div :id="`collapse${idx}`" class="accordion-collapse collapse" :class="{show: idx === 0}" data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                    <h5 v-if="wishListItemMatch.length!=0">Matches these Wishlist items</h5> 
                    <ul>
                      <li v-for="item in wishListItemMatch">{{item.itemName}}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
      
    </div>
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
      nearbyUserArr: [],
      nearbyUsersIDs: undefined,
      radiusInKm : 5,
      userPin : null,
    }
  },

  methods: {

    putUserMarker(position){
      if(this.userPin){
        this.userPin.setLatLng([position.coords.latitude, position.coords.longitude])
        this.userPin.bindPopup("You are here")
        this.userPin.openPopup()
      } else {
        this.userPin = L.marker([position.coords.latitude, position.coords.longitude], {icon : this.red}).addTo(this.map)
        this.userPin.bindPopup("Your Preferred Bus Stop is here!")
        this.userPin.openPopup()
      }
      this.map.flyTo([position.coords.latitude, position.coords.longitude],16);

    },

    getLocation() {
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
          this.load({
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

    findItemOwner(item){
      // retrieve ListedItemOwner ID and Coordinates
      let ownerID = item.user._id;
      let ownerCoords = this.nearbyUsersIDs[ownerID].loc.coordinates;
      let ownerLat = ownerCoords[1];
      let ownerLon = ownerCoords[0];
      let ownerPBS = this.nearbyUsersIDs[ownerID].busStopName;
      console.log(ownerLat,ownerLon);
      // move current pin to ListedItemOwner and fly to it
      if (this.marker) {
        this.marker.setLatLng([ownerLat,ownerLon]);
        this.map.flyTo([ownerLat,ownerLon],16);
        this.marker.bindPopup("The owner of "+item.itemName+" would prefer to meet at "+ownerPBS+"!").openPopup();
        var vm = this;
        let itemID = item._id;
        this.marker.on('click', function(){
          vm.$router.push("/item/"+itemID);
        })
      }
      else {
        this.marker = L.marker([ownerLat,ownerLon], {icon : this.emoji}).addTo(this.map);
        this.map.flyTo([ownerLat,ownerLon],16);
        this.marker.bindPopup("The owner of "+item.itemName+" would prefer to meet at "+ownerPBS+"!").openPopup();
        var vm = this;
        let itemID = item._id;
        this.marker.on('click', function(){
          vm.$router.push("/item/"+itemID);
        })
      }
    },

    load(position){
      this.loadStore.loading=true

      var options = {
        params : {
          radiusInKm : this.radiusInKm
        }
      }

      if(position){
        options.params.longitude = position.coords.longitude
        options.params.latitude = position.coords.latitude
      }

      //get nearby user data
      this.axios.get(`${import.meta.env.VITE_BACKEND}/busStop/nearbyListingsRecommended`, options).then(response=>{
        this.loadStore.loading=false
        console.log(response,"nearbyUserArr array");
        this.nearbyUserArr = response.data
      }).catch(
        e => {
          this.$toast.error("Issue with fetching data")
          console.log(e)
          this.$router.push("/")
        }
      ),


      this.axios.get(`${import.meta.env.VITE_BACKEND}/busStop/nearbyUsers`,options).then(response=>{
        console.log(response,"nearbyUsersIDs object");
        this.nearbyUsersIDs = response.data
      })
          }



        },

  computed : {
    ...mapStores(useLoadStore,useUserStore)
  },

  created() {


    this.load()

    this.axios.get(`${import.meta.env.VITE_BACKEND}/user/${this.userStore.username}`).then(
      response => {
        if(response.data.data.busStop){
          this.putUserMarker({
          coords : {
            latitude : response.data.data.busStop.loc.coordinates[1],
            longitude : response.data.data.busStop.loc.coordinates[0]
          }
        })
        } else {
          this.$toast.warning("Please choose a preferred bus stop")
          this.$router.push("/user/busStop")
        }
      }
    )
  },

  //any ajax call to start is executed here
  mounted() {
    // create an icon 


    //put the javascript inside here
    this.map = L.map('map',{tap:false}).setView([1.402382926961625, 103.89701354063448], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        //dont forget to add this in front of map
    }).addTo(this.map);

  }

    

}
</script>


//
