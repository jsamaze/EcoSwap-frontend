<script setup>
  //import these to access GLOBAL state variables
import GreenBtn from '../components/GreenBtn.vue';
import { mapStores } from 'pinia';
import { useUserStore } from '../store/UserStore';
import MiddleCardForListing from '../components/MiddleCardForListing.vue';
import moment from "moment";
import * as bootstrap from 'bootstrap';
  // //this is how you import external css files
  // import "../assets/base.css"

</script>

<template>
  <!-- type your HTML here -->

  <h1 class="titleBold text-center" style="font-size: xxx-large;">Points Summary</h1>

  <div class="container-fluid mt-5" style="max-width: 80%;">
    <div class="accordion" id="accordionPanelsStayOpenExample">
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
            <h4>Points and tier information</h4>
          </button>
        </h2>
        <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show">
          <div class="accordion-body">
            <div class="container-fluid">
              <div class="row align-items-start">
                <div class='col-md-6 col-12 justify-content-center'>
                  <h4>Point System</h4>
                  <table class="table" style=" text-align: center; border: 1px solid rgb(192, 192, 192);">
                    <tr style="border: 1px solid rgb(192, 192, 192);">
                      <th style="padding: 10px;">Action</th>
                      <th>Points Range</th>
                    </tr>
                    <tr style="border: 1px solid rgb(192, 192, 192);">
                      <td style="padding: 10px;">List Item</td>
                      <td>+2 Points</td>
                    </tr>
                    <tr style="border: 1px solid rgb(192, 192, 192);">
                      <td style="padding: 10px;">Remove Item</td>
                      <td>-2 Points</td>
                    </tr>
                    <tr style="border: 1px solid rgb(192, 192, 192);">
                      <td style="padding: 10px;">Trade</td>
                      <td>+5 Points</td>
                    </tr>
                  </table>
                </div>
                <div class='col-md-6 col-12 justify-content-center'>
                  <h4>Tier System</h4>
                  <table class="table" style=" text-align: center; border: 1px solid rgb(192, 192, 192);">
                    <tr style="border: 1px solid rgb(192, 192, 192);">
                      <th style="padding: 10px;">Tier</th>
                      <th>Points range</th>
                    </tr>
                    <tr style="border: 1px solid rgb(192, 192, 192);">
                      <td style="padding: 10px;" class="text-success">Green</td>
                      <td>0-99</td>
                    </tr>
                    <tr style="border: 1px solid rgb(192, 192, 192);">
                      <td style="padding: 10px;" class="text-secondary">Silver</td>
                      <td>100-299</td>
                    </tr>
                    <tr style="border: 1px solid rgb(192, 192, 192);">
                      <td style="padding: 10px;" class="text-warning">Gold</td>
                      <td>300-499</td>
                    </tr>
                    <tr style="border: 1px solid rgb(192, 192, 192);">
                      <td style="padding: 10px;" class="rainbow">Superstar</td>
                      <td>500+</td>
                    </tr>
                  </table>
                  <div>Your tier is determined by your total points before rewards redemption!</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container-fluid">

    <div class="row mx-1">
      <h1>My Points</h1>
    </div>

    <div class="row mx-1">
      <div class="col-lg-6">
        <div class="card w-100 max-w-100 p-3 mb-3" style="height: fit-content">
          <div class="card-body ">
            <img src="..\assets\images\reward.png " style="width: 24%; height: 24%; margin-bottom: 3px;" >
            
            <h4 class="card-title" :class="REWARD_TIER[tier].cssColor">{{ tier.toUpperCase() }}</h4>

            <div v-if="tier != 'Superstar'">
              <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
              <div class="progress-bar progress-bar-striped progress-bar-animated" :style="{width: `${percent}%`}">{{ percent }}%</div>
            </div>
            <!-- numPoints needs to be dynamic so should implement function or what -->
            <h6 class="card-subtitle mt-2 text-muted">{{ numPoints }} points needed to reach next tier</h6>

            </div>

            <div v-else>
              <h6 class="card-subtitle mt-2 text-muted rainbow">You are at the highest tier</h6>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="card w-100 max-w-100 mb-3" style="height: 50%">
          <div class="card-body">
            <div class="row">
              <img src="..\assets\images\star.png" style="width: 25%; height: 25%; margin-bottom: 3px;">
            </div>
            <hr>
            <div class="row">
              <h3>Accumulated Points: {{accPoints}}</h3>
            </div>
            <div class="row">
              <h3>Available Points: {{ netPoints }}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>

    <br>

    <div class="row mx-1">
      <h1>My Rewards</h1>
    </div>

    <div class="row">
      <div class="col-md-4" v-for="item in rewards">
        <div class="card w-100 max-w-100 p-2 mb-3" style="height: fit-content">
          <div class="card-body">
            <h5 class="card-title text-center"><b>{{ item.prizeTitle }}<br> ({{ Math.abs( item.points) }} points)</b></h5>
            <h6 class="card-subtitle mt-2 text-muted text-center">{{ item.prizeDescription }} <br> <br>Only for first {{ item.max }} redeemers. While stocks last!</h6>
            <br>
            <div class=" text-center">
              <GreenBtn @click="(Math.abs(item.points) <= netPoints) && redeem(item.rewardName)" v-if="Math.abs(item.points) <= netPoints">Redeem</GreenBtn>
              <button v-else disabled class="btn btn-lg my-3 btn-dark">Not enough points!</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <br>

    <div class="row text-center">
      <h1>Transaction History</h1>
    </div>

    <MiddleCardForListing>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Action</th>
            <th scope="col">Date</th>
            <th scope="col">Points</th>
          </tr>
        </thead>
        <tbody >
          <tr v-for="(transaction,idx) in transactions" :class="{'table-success text-white' : rewards_rewardName.includes(transaction.rewardName) }">
            <th scope="row">{{idx+1}}</th>
            <td v-if="transaction.rewardName=='addListedItem'"><b>List Item</b></td>
            <td v-else-if="transaction.rewardName=='trade'"><b>Successful Trade</b></td>
            <td v-else-if="transaction.rewardName=='removeListedItem'"><b>Deleted Listed Item</b></td>
            <td v-else><b>Redeemed: {{ transaction.rewardName}}</b></td>
            <td v-if="transactions.length!=0">{{ moment(transaction.createdAt).format("DD/MM/YYYY")}}</td>
            <td v-if="transactions.length!=0">{{ (transaction.points > 0 ? "+" : "")+  transaction.points }}</td>
          </tr>
          <tr v-if="transactions.length==0" >
            <td colspan="4" class="text-center">No point transactions yet!</td>
          </tr>
        </tbody>
      </table>
    </MiddleCardForListing>

  </div>
</template>

<style scoped> 

.rainbow {
  font-weight: bold;
  background: linear-gradient(to right, #ef5350, #f48fb1, #7e57c2, #2196f3, #26c6da, #43a047, #eeff41, #f9a825, #ff5722);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

h1{
  padding-top: 30px;
}

.table-hover tbody tr:hover td, .table-hover tbody tr:hover th {
  background-color: #d2e296;
}

.header{
  position: sticky;
  top: 0;
  background-color: white; /* Set the background color as needed */
  z-index: 1;
  padding-bottom: 10px;
}

.accordion{
  --bs-accordion-btn-bg: #d2e296;
  --bs-accordion-active-bg: #d2e296;
}
</style>

<script>
export default {

  // this is data, website will reload if this change
  computed : {
    ...mapStores(useUserStore),

    percent(){
      return Math.floor(((this.accPoints-this.REWARD_TIER[this.tier].start)/(this.REWARD_TIER[this.tier].range))*100)
    },

    numPoints(){
      return -(this.accPoints-this.REWARD_TIER[this.tier].end)
    }
  },
  data() {

    return {
      rewards : [],
      choices : [],
      transactions : [],

      netPoints:0,
      accPoints:0,
      tier:'Superstar',
      rewards_rewardName: [],

      REWARD_TIER : {
        Green : {
          cssColor : 'text-success',
          range : 100,
          start : 0,
          end : 100,
        },
        Silver : {
          cssColor : 'text-secondary',
          range : 200,
          start : 100,
          end : 300,
        },
        Gold : {
          cssColor : 'text-warning',
          range : 200,
          start : 300,

          end : 500,
        },
        Superstar : {
          cssColor : 'rainbow',
          start : 500,
          range: 100, // just here to prevent error
          end : 600,
        }
      }
    }
  },

  methods: {
    async load (){
      try {
        var l = this.$loading.show()
        var ajax1 = await this.axios.get( `${import.meta.env.VITE_BACKEND}/reward`)
        var ajax2 = await this.axios.get( `${import.meta.env.VITE_BACKEND}/reward/transactions`)
        var ajax3 = await this.axios.get(`${import.meta.env.VITE_BACKEND}/user/${this.userStore.username}`)

        this.rewards = ajax1.data.rewards
        this.choices = ajax1.data.choices
        this.transactions = ajax2.data.data

        this.rewards_rewardName = this.rewards.map(e => {
          return e.rewardName
        })

        this.netPoints = ajax3.data.data.netPoints
        this.accPoints = ajax3.data.data.accumulatedPoints
        this.tier = ajax3.data.data.tier

        l.hide()
        

      } catch (error) {
        console.log(error)
        this.$router.push("/")
      }
    },
    redeem(rewardName){
      var load = this.$loading.show()

      this.axios.post(`${import.meta.env.VITE_BACKEND}/reward/${rewardName}/`).then(
        response => {
          this.$toast.success("Success redeeming. Please check your email")
          load.hide()
          this.load()
        }
      ).catch(
        e => {
          console.log(e)
          this.$toast.error("Error: " + e.response.data.problem)
          load.hide()
        }
      )

    }
  },


  //any ajax call to start is executed here
   async created() {
    await this.load()
   }
}
</script>