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
        <h1 >Points summary: </h1>
        
        <div class='col justify-content-center overflow-auto' style="height: 60vh;">
            <div class="white p-3">
              <h3>Here is how you can get points</h3>
                
                <div class="card" style="width: 100%; height: auto;">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item " v-for="item in choices">
                        <b>{{ item.rewardName }}</b>
                        {{ (item.points > 0 ? "+" : "")+  item.points }} points
                    </li>
                </ul>
                </div>

                <h3>Rewards</h3>
                
                <div class="card" style="width: 100%; height: auto;">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item " v-for="item in rewards">
                        <b>{{ item.prizeTitle }}</b>
                        <p>{{ item.prizeDescription }}</p>
                        {{ Math.abs( item.points) }} points
                        <GreenBtn @click="(Math.abs(item.points) <= netPoints) && redeem(item.rewardName)" :disabled="Math.abs(item.points) > netPoints" disabledPopover="Not enough points">Redeem</GreenBtn>
                    </li>
                </ul>
                </div>




            </div>
            
            
                
            
            
            

      </div>

        <div class='col  justify-content-center overflow-auto' style="height: 60vh;">
          <div class="white p-3">

            You have accumulated {{ accPoints }} points so far
            (before spending)

            <br> Your are tier {{ tier }}

            <table class="table table-striped">
              <tr>
                <th>Tier</th>
                <th>Points range</th>
              </tr>
              <tr>
                <td>Green</td>
                <td>0-99</td>
              </tr>
              <tr>
                <td>Silver</td>
                <td>100-299</td>
              </tr>
              <tr>
                <td>Gold</td>
                <td>300-499</td>
              </tr>
              <tr>
                <td>Superstar</td>
                <td>500+</td>
              </tr>
            </table>

            You have {{ netPoints }} points to spend

            <h3>Transactions</h3>

            <div class="card" style="width: 100%; height: auto;">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item" :class="{'bg-success text-white' : rewards_rewardName.includes(transaction.rewardName) }" v-for="transaction in transactions">
                        <b>{{ transaction.rewardName}}</b>
                        {{ moment(transaction.createdAt).format("DD/MM/YYYY")}}

                        <br>{{ (transaction.points > 0 ? "+" : "")+  transaction.points }} points
                       
                    </li>
                    <li class="list-group-item" v-if="transactions.length == 0">
                      Empty
                       
                    </li>
                </ul>
                </div>
    

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