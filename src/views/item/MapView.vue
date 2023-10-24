<script setup>
  //import these to access GLOBAL state variables
  import '../../../node_modules/leaflet/dist/leaflet.css'
  import L from 'leaflet'
  // //this is how you import external css files
  // import "../assets/base.css"
  import {pinPicture} from "../../assets/assets"
  import {RouterLink} from "vue-router"

</script>

<template>
  <!-- type your HTML here -->
  <main>
    <div class="container-fluid">

      <div class="row">
        <div class="col-3 overflow-auto" style="height: 100vh">

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
        </div>
        <!--<RouterLink :to="`/item/${listedItem._id}`"></RouterLink>-->
        <div class="col-9">
          <div id="map"></div>
          <!-- Get location of user fly to it-->
          <span @load="getLocation"></span>
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
      nearbyUserArr: [],
      nearbyUsersIDs: undefined,
    }
  },

  methods: {
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
        this.marker = L.marker([ownerLat,ownerLon]).addTo(this.map);
        this.map.flyTo([ownerLat,ownerLon],16);
        this.marker.bindPopup("The owner of "+item.itemName+" would prefer to meet at "+ownerPBS+"!").openPopup();
        var vm = this;
        let itemID = item._id;
        this.marker.on('click', function(){
          vm.$router.push("/item/"+itemID);
        })
      }
    },

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
      console.log(response,"nearbyUserArr array");
      this.nearbyUserArr = response.data
    }),


    this.axios.get(`${import.meta.env.VITE_BACKEND}/busStop/nearbyUsers`,{
    params : {
        radiusInKm:5, //MUST GIVE
      }
    }).then(response=>{
      console.log(response,"nearbyUsersIDs object");
      this.nearbyUsersIDs = response.data
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

  }

    

}
</script>


//