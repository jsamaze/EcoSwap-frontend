<script setup>
  //import these to access GLOBAL state variables
  import '../../../node_modules/leaflet/dist/leaflet.css'
  import L from 'leaflet'
  // //this is how you import external css files
  // import "../assets/base.css"
  import {pinPicture, redPin} from "../../assets/assets"
  import {RouterLink} from "vue-router"
  import { useLoadStore } from '../../store/InitialLoadStore'
  import { mapStores } from 'pinia'
import { useUserStore } from '../../store/UserStore'

</script>

<template>
  <!-- type your HTML here -->
    <div class="container-fluid">


      <div class="row">
        <h3>        Find items near you - we help u find listed items that match the wish list Items 
          Click on the item in the list
</h3>
            <button class="btn btn-success" v-on:click="getLocation()">
          Use your location
      </button>
      <form class="mb-3" @submit.prevent="getLocationAddress()">
        <label for="exampleFormControlInput1" class="form-label">Enter an address to find bus stops within 5km</label>
        <input type="text" class="form-control" v-model="query" placeholder="123 Ecoswap Avenue">
        <button class="btn btn-primary">Search</button>
      </form>
      
      <label for="customRange2" class="form-label">distance from you : {{ radiusInKm }} km</label>
      <input type="range" class="form-range" min="0" max="5" step="0.5" id="customRange2" v-model="radiusInKm">

      <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
        See items for you
      </button>
      </div>


      <div class="row">
        <!--<RouterLink :to="`/item/${listedItem._id}`"></RouterLink>-->
        <div class="col">
          <div id="map"></div>
          <!-- Get location of user fly to it-->
        </div>

      </div>
    </div>

    <!-- offcanvas -->
    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasExampleLabel">Reccomended Items for you<br>Click and close this canvas to see item owner's location</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
          <!-- Creating an accordion for each item with a loop -->
          <div class="accordion" id="accordionExample">
            <div class="accordion" id="accordionExample" style="margin-top: 10px">
              <div class="accordion-item" v-for="({listedItem,wishListItemMatch},idx) in nearbyUserArr">
                <h2 class="accordion-header">
                  <button class="accordion-button" :class="{ collapsed: idx >0}" type="button" data-bs-toggle="collapse" v-bind:data-bs-target="'#collapse'+idx" @click="findItemOwner(listedItem)">
                    <!-- later remove the link, use event listener to move to point on map where item Owner is -->
                    <div class="row">
                      <div><h4>Listed Item: {{listedItem.itemName}}</h4></div>
                      <div>{{ listedItem.description }}</div>
                    </div>
                  </button>
                </h2>
                <div :id="`collapse${idx}`" class="accordion-collapse collapse" :class="{show: idx === 0}" data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                    <ul>
                      <h5>We found this item to match the following items in your Wishlist</h5>
                      <li v-for="item in wishListItemMatch">{{item.itemName}}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- must check for items in User Wishlist then ask them if they want to add-->
          <div v-if="nearbyUserArr.length==0">
            <h5> Sorry, we don't have any recommendations for you at the moment. <br>
            Add more Wishlist Items so that we can better find matches for you.</h5>
            <button type="button" class="btn btn-success">
              Add Wishlist Items
            </button>
          </div>


        </div>
        <!--<RouterLink :to="`/item/${listedItem._id}`"></RouterLink>-->
        <div class="col-9">
          <div id="map"></div>
          <!-- Get location of user fly to it-->
        </div>

  </div>
</div>
</template>

<style scoped>
/* you can also import css files */
#map { height: 100vh; }
h5{text-align: left;}
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
      wishlistItems: []
    }
  },

  methods: {

    putUserMarker(position){
      if(this.userPin){
        this.userPin.setLatLng([position.coords.latitude, position.coords.longitude])
      } else {
        this.userPin = L.marker([position.coords.latitude, position.coords.longitude], {icon : this.red}).addTo(this.map)
        this.userPin.bindPopup("You are here!")
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
    //loading screen
    //var load = this.$loading.show();


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