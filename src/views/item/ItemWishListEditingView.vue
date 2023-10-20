<script setup>
  //import these to access GLOBAL state variables
  import {RouterLink} from 'vue-router'
  import TextInput from '../../components/TextInput.vue'


  // //this is how you import external css files
  // import "../assets/base.css"

</script>

<template>
  <!-- type your HTML here -->
  <main>
    <div class="container-fluid">
        <div class="row background">

            <div class="col-sm-6">
                <!-- card -->
                <div class="card w-75 m-auto my-5 ">
                <div class="card-body  ">

                  
                    
                    <a href="#" class="btn background-dark-green text-white"> Back</a>
                    <div class="row">
                        <div class="col-sm-6">
                            <!-- carousel -->
                            [PHOTO THING]

                            <!-- end carousel -->
                            <div class="row">
                                <a href="#" class="btn background-green text-white my-4 subtitle"> Upload Photo</a>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="row mt-5">
                                
                                <h1 class="title">Edit Wish List</h1>
                                <!-- <span class="badge text-bg-secondary float-end">Listing</span> -->

                                
                            </div>
                            <div class="row">

                                 <div class="mb-3"> 
                                     <label for="name" class="form-label title">Listing Name</label> 
                                     <input type="text" class="form-control" id="name" v-bind:placeholder="itemName"> 
                                 </div> 
                                
                              
                            
                            </div>
                            <div class="row">

                            <div class="mb-3"> 
                                <label for="exampleFormControlInput1" class="form-label title">Category</label> 
                                <select class="form-select ">
                                <option selected>Kitchenware</option>
                                <option value="1">Furniture</option>
                                <option value="2">Electronics</option>
                                <option value="3">Clothes</option>
                                </select>
                            </div> 
                            <div class="row">

                              <div class="mb-3"> 
                                <label for="exampleFormControlInput1" class="form-label title">Tags</label> 
                                <select class="form-select" multiselect>
                                <option selected>Tags</option>
                                <option value="1">Kitchen</option>
                                <option value="2">Essentials</option>
                                <option value="3">Clothes</option>
                              </select>
                            </div>

                            </div>


                            </div>
                            

                            

                            <div class="row">

                            <div class="mb-3"> 
                                <label for="Desciption" class="form-label title">Desciption</label> 
                                 
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-bind:placeholder="itemName"></textarea> 
                               
                                
                    
                            </div> 
                            </div>

                           <br>
                           
                            

                            <div class="row">
                                <a href="#" class="btn background-green text-white my-4 subtitle"> Save</a>
                            </div>

                        </div>
                    </div>
                </div>
                </div>
                <!-- card end -->
            </div>
        </div>
    </div>



  </main>
</template>

<style>
/* you can also import css files */
.card{
    width: 700px;
    height: 700px;
}
.bold{
    font-weight: bold;
}
</style>

<script>
export default {

  // this is data, website will reload if this change
  data() {
    return {
      condition : "",
      category : "",
      description : "",
      itemName : "",
      username : "",
      preferredBusStop: ""
    }
  },

  methods: {
    login() {
      // you need to use this in the methods
      this.axios.post(`${import.meta.env.VITE_BACKEND}/user/login`,{
        username: this.username, 
        password: this.password
      }). then((response)=>{
        console.log(response)
        this.$router.push(`/home`)
      }).catch((error)=>{
        console.log(error)
      })
    }
  },


  //any ajax call to start is executed here
  created() {
    this.axios.get(`${import.meta.env.VITE_BACKEND}/item/${this.$route.params.itemId}`)
        .then(response => {
            
            
             this.condition =response.data.data.condition;
             this.category = response.data.data.category;
             this.description = response.data.data.description;
             this.itemName = response.data.data.itemName;

             this.username =response.data.data.user.username;
             this.preferredBusStop=response.data.data.user.preferredBusStop;

             console.log(response.data);
            console.log(response.data.data.user.username)
        })
        .catch( error => {
            console.log(error);
        });
  }
}
</script>