<script setup>
  //import these to access GLOBAL state variables
import GreenBtn from '../components/GreenBtn.vue';
import { mapStores } from 'pinia';
import { useUserStore } from '../store/UserStore';
import MiddleCardForListing from '../components/MiddleCardForListing.vue';
import moment from "moment";
  // //this is how you import external css files
  // import "../assets/base.css"

</script>

<template>
  <!-- type your HTML here -->

    <h1 class="titleBold text-center" style="font-size: xxx-large;">Points summary</h1>
    <div class="text-center">
      <h4><b>Total Points: </b>{{ netPoints }} </h4>
      <h4><b>Current Tier: </b><span :style="{color: tier} ">{{ tier }}</span> </h4>
    </div>

    <div class="container-fluid mt-5" style="max-width: 80%;">
      <div class="accordion" id="accordionPanelsStayOpenExample">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
              Points and tier information
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
                      <td style="padding: 10px;">Green</td>
                      <td>0-99</td>
                    </tr>
                    <tr style="border: 1px solid rgb(192, 192, 192);">
                      <td style="padding: 10px;">Silver</td>
                      <td>100-299</td>
                    </tr>
                    <tr style="border: 1px solid rgb(192, 192, 192);">
                      <td style="padding: 10px;">Gold</td>
                      <td>300-499</td>
                    </tr>
                    <tr style="border: 1px solid rgb(192, 192, 192);">
                      <td style="padding: 10px;">Superstar</td>
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

  <div class="container-fluid p-0">
    <div class="row align-items-start">
      <div class="col-md-6">
        <MiddleCardForListing>
          <div class="header">
            <h3>Point transactions</h3>
          </div>
          <div class="card" style="width: 100%; height: auto;">
            <ul class="list-group list-group-flush">
              <li class="list-group-item" :class="{'bg-success text-white' : rewards_rewardName.includes(transaction.rewardName) }" v-for="transaction in transactions">
                  <!-- <b>{{ transaction.rewardName}}</b>  -->
                  <div v-if="transaction.rewardName=='addListedItem'"><b>List Item</b></div>
                  <div v-else-if="transaction.rewardName=='trade'"><b>Successful Trade</b></div>
                  <div v-else><b>Redeemed: {{ transaction.rewardName}}</b></div>
                  Date: {{ moment(transaction.createdAt).format("DD/MM/YYYY")}}
                  <br>Points: {{ (transaction.points > 0 ? "+" : "")+  transaction.points }} points
        
              </li>
              <li class="list-group-item" v-if="transactions.length == 0">
                No point transactions yet!
              </li>
            </ul>
          </div>
        </MiddleCardForListing>
      </div>
      <div class="col-md-6">
        <MiddleCardForListing>
          <div class="header">
            <h3>Rewards</h3>
          </div>
          <div class="card" style="width: 100%; height: auto;">
          <ul class="list-group list-group-flush">
              <li class="list-group-item " v-for="item in rewards">
                  <b>{{ item.prizeTitle }} ({{ Math.abs( item.points) }} points)</b>
                  <br>{{ item.prizeDescription }}
                  Only for first {{ item.max }} redeemers. While stocks last!
                  <div class="my-2">
                    <GreenBtn @click="(Math.abs(item.points) <= netPoints) && redeem(item.rewardName)" v-if="Math.abs(item.points) <= netPoints">Redeem</GreenBtn>
                    <button v-else disabled class="btn btn-md btn-dark">Not enough points!</button>
                  </div>
              </li>
          </ul>
          </div>
        </MiddleCardForListing>
      </div>
    </div>
  </div>
</template>

<style scoped> 

h1{
  padding-top: 30px;
}

.header{
  position: sticky;
  top: 0;
  background-color: white; /* Set the background color as needed */
  z-index: 1;
  padding-bottom: 10px;
}
</style>

<script>
export default {

  // this is data, website will reload if this change
  computed : {
    ...mapStores(useUserStore)
  },
  data() {

    return {
      rewards : [],
      choices : [],
      transactions : [],

      netPoints:0,
      accPoints:0,
      tier:0,
      rewards_rewardName: [],
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