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
  import { placeholder } from '../../assets/assets';


  import * as bootstrap from 'bootstrap'

</script>

<template>
  <!-- type your HTML here -->
  
  <MiddleCardForListing>
    <div class="container-fluid text-center my-4">
      <span style="display: inline;">
      <h1 style="font-size: xxx-large; display: inline-block; margin-right: 15px;">Find items near you!</h1>
      <!-- modal start -->
        <!-- Button trigger modal -->
        <button type="button" data-bs-toggle="modal" data-bs-target="#instructionalModal" style="border: 0; background-color: white;">
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
              <p><b>Find items near you that match your wishlist!</b></p>
              <ol>
                <li>Enter an address or use your current location</li>
                <img src="/src/assets/images/UMap_modal1.gif" style="width: 90%;">
                <br><br>
                <li>Adjust the search radius</li>
                <img src="/src/assets/images/UMap_modal2.gif" style="width: 90%;">
                <br><br>
                <li>Search and view items that match your wishlist items</li>
                <img src="/src/assets/images/UMap_modal3.gif" style="width: 90%;">
                <br><br>
                <li>See the item owner's preferred bus stop and more information about the item</li>
                <img src="/src/assets/images/UMap_modal4.gif" style="width: 90%;">
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

      <form class="mb-3 " @submit.prevent="getLocationAddress()">
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

      <div class="text-center">
        <GreenBtn class="btn btn-lg btn-success" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
          View recommended items
        </GreenBtn>
      </div>

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
          <h4>
          There is no item to recommend nearby. 
          <br>
          Try choosing another location, or adding more items to your wishlist!
          </h4>
          <button type="button"  class="btn btn-success btn-lg mt-2" @click="$router.push('/item/add?itemType=WishList')">
            Add wishlist items now!
          </button>
        </div>

          <!-- Creating an accordion for each item with a loop -->
          <div class="accordion" id="accordionExample">
            <div class="accordion" id="accordionExample" style="margin-top: 10px">
              <div class="accordion-item" v-for="({listedItem,wishListItemMatch},idx) in nearbyUserArr">
                <h2 class="accordion-header">
                  <button class="accordion-button" :class="{ collapsed: idx >0}" type="button" data-bs-toggle="collapse" v-bind:data-bs-target="'#collapse'+idx" @click="findItemOwner(listedItem)">
                    <!-- later remove the link, use event listener to move to point on map where item Owner is -->
                    <div class="row">
                      <div><img v-if="listedItem.photoURLs.length!=0" v-lazy="listedItem.photoURLs.length > 0 ? listedItem.photoURLs[0] : placeholder" style="width: 50%; height: 50%; margin-bottom: 5px;" class="rounded"/></div>
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
                    <ol>
                      <li v-for="item in wishListItemMatch">{{item.itemName}}</li>
                    </ol>
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
      showNextTime: false,
      instructionalModal : null,

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
      query : '',


      nearbyUsersIDs : null,
      userLoc : null,
    }
  },

  methods: {



    closeNextTime(){
      if(localStorage.getItem("MapView")==null){
        localStorage.setItem("MapView",true)
      } else {
        localStorage.removeItem("MapView")
      }
    },


    
    createMap(arr){
      if(this.map){
        this.map.off()
        this.map.remove()
        this.marker = null
      }
      this.map = L.map('map').setView(arr ?? [1.402382926961625, 103.89701354063448], 11);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {

        zoomControl: true,zoom:1,zoomAnimation:false,fadeAnimation:true,markerZoomAnimation:true,
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(this.map);
    },

    putUserMarker(position, goThere){
      this.userPin = L.marker([position.coords.latitude, position.coords.longitude], {icon : this.red}
        ).addTo(this.map)
        this.userPin.bindPopup("You are here!")
        this.userPin.openPopup()
        if(goThere){
          this.map.flyTo([position.coords.latitude, position.coords.longitude],16);
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
        this.placeNearbyUsers(resp)
}).catch(
  e=>{
    console.log(e, "here")
    this.$toast.error("Error with fetching location data")
  }
).finally(
  () =>{
    this.loadStore.loading=false
  }
)




},


placeNearbyUsers(resp){
  this.busStopObj = new Map()
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
temp.bindPopup(`${item.usernames.join(", ")} ${item.usernames > 1 ? " are" : " is"} trading at the bus stop: ${item.busStopName}`)

temp.on('mouseover',function(e){
  this.openPopup()
}),
temp.on('mouseout', function(e){
this.closePopup()
})
this.pointsArr.push(temp)
} else {
  temp.bindPopup(`${item.usernames.join(", ")} ${item.usernames > 1 ? " are" : " is"} trading at the bus stop: ${item.busStopName}`)

temp.on('mouseover',function(e){
  this.openPopup()
}),
temp.on('mouseout', function(e){
this.closePopup()
})
this.pointsArr.push(temp)
}
})
},

    getLocation() {
      this.createMap()
      this.loadStore.loading=true
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((data) => {
          this.userLoc = data
          this.putUserMarker(data,true)
          this.load(data)
          this.showPosition(data)
        },(e) =>{
          this.loadStore.loading=false
          this.$toast.warning("You have disabled sharing your location")
        });
      } else { 
        this.$toast.warning("Your device is not compatible")
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
          this.userLoc = {
          coords : {
            latitude : response.data[0].lat,
            longitude : response.data[0].lon
          }
        }
          this.load({
          coords : {
            latitude : response.data[0].lat,
            longitude : response.data[0].lon
          }
        })
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
        },true)
        } else {
          this.$toast.error("Did not find any location matching your query")
          this.loadStore.loading=false
        }

      } catch(e){
        console.error(e)
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

      this.createMap([ownerLat,ownerLon])
      this.putUserMarker(this.userLoc)
      this.placeNearbyUsers({
        data : this.nearbyUsersIDs
      })
      this.marker = L.marker([ownerLat,ownerLon], {icon : this.emoji}).addTo(this.map);
        this.map.setView([ownerLat,ownerLon],16);
        this.marker.bindPopup("The owner of "+item.itemName+`, ${item.user.username} , would prefer to meet at `+ownerPBS+"!").openPopup();

        var vm = this;
        let itemID = item._id;
        this.marker.on('mouseover',function(e){
          this.openPopup()
        }),
          this.marker.on('mouseout', function(e){
          this.closePopup()
          })
        this.marker.on('click', function(){
          vm.$router.push("/item/"+itemID);
        })

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
      console.log('options :>> ', options);

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
        this.placeNearbyUsers({data : this.nearbyUsersIDs})
      })
          }



        },

  computed : {
    ...mapStores(useLoadStore,useUserStore)
  },

  created() {

    
    if(localStorage.getItem("MapView")==null){
        this.showNextTime=false;
      } else {
        this.showNextTime=true;
      }


    
    this.load()

    this.axios.get(`${import.meta.env.VITE_BACKEND}/user/${this.userStore.username}`).then(
      response => {
        if(response.data.data.busStop){
          if(localStorage.getItem("MapView")==null){
            this.instructionalModal.show()
          }
          this.userLoc = {
          coords : {
            latitude : response.data.data.busStop.loc.coordinates[1],
            longitude : response.data.data.busStop.loc.coordinates[0]
          }
        }
          this.putUserMarker({
          coords : {
            latitude : response.data.data.busStop.loc.coordinates[1],
            longitude : response.data.data.busStop.loc.coordinates[0]
          }
        },true)
        this.showPosition({
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

    this.instructionalModal= new bootstrap.Modal(this.$refs.instructionalModal)



    

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
