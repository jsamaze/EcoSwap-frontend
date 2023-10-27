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


   <MiddleCardForListing>
    
    <div class="container-fluid">
      <div class="row">
        <div style="padding-left: 27px;" class="col">
          <h1 >Points summary: </h1>
        </div>
        
        </div>
        <div class="row">
        <div class='col-lg-6 justify-content-center overflow-auto' style="height: 60vh;">
            <div class="white p-3">
              <H4>Total Points: {{ netPoints }} | Current Tier: {{ tier }}</H4>
              <h4>Points Information</h4>
                
               
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
                <br><h4>Tier Information</h4>
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

                <br>
                <!-- start -->
                <h4>Transactions</h4>

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
                          Empty
                          
                        </li>
                    </ul>

                    
                    </div>
                <!-- end -->
                
                




            </div>
            
            
                
            
            
            

      </div>

        <div class='col  justify-content-center overflow-auto' style="height: 60vh;">
          <div class="white p-3">

            <!-- <h4>Accumulated Points: {{ accPoints }}</h4> -->
            <!-- <h4>Total Points: {{ netPoints }}</h4>
            <h4>Current Tier: {{ tier }}</h4> -->

           

           
            
                <!-- start -->
                <h4>Rewards</h4>
                
                <div class="card" style="width: 100%; height: auto;">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item " v-for="item in rewards">
                        <b>{{ item.prizeTitle }} ({{ Math.abs( item.points) }} points)</b>
                        <br>{{ item.prizeDescription }}
                        <p> Only for first {{ item.max }} redeemers. While stocks last!</p>
                        <GreenBtn @click="(Math.abs(item.points) <= netPoints) && redeem(item.rewardName)" :disabled="Math.abs(item.points) > netPoints" disabledPopover="Not enough points">Redeem</GreenBtn>
                    </li>
                </ul>
                </div>
                <!-- end -->
    

        </div>
        
      </div>
    </div>
</div>

   </MiddleCardForListing>
</template>

<style scoped> 


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
  created() {
    this.load()
  }
}
</script>