<template>
                                <div id="marketplaceCarousel" class="container-fluid carousel slide" data-bs-ride="carousel">
                            <div class="carousel-indicators" v-if="images.length>0">
                              <button v-for="img, idx in images.slice(0,1)" type="button" data-bs-target="#marketplaceCarousel" :data-bs-slide-to="idx" class="active"></button>
                              <button v-for="img, idx in images.slice(1,images.length)" data-bs-target="#marketplaceCarousel" :data-bs-slide-to="idx+1" ></button>
                            </div>


                            <div class="carousel-inner" v-if="images.length>0" >
                              <div v-for="img, idx in images.slice(0,1)" class="carousel-item active">
                                <img :src="img" class="d-block w-100" alt="...">
                              </div>
                              <div v-for="img, idx in images.slice(1,images.length)" class="carousel-item" v-if="images.length>1">
                                <img v-lazy="img" class="d-block w-100" alt="...">
                              </div>


                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#marketplaceCarousel" data-bs-slide="prev">
                              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                              <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#marketplaceCarousel" data-bs-slide="next">
                              <span class="carousel-control-next-icon" aria-hidden="true"></span>
                              <span class="visually-hidden">Next</span>
                            </button>
                          </div>
</template>

<script>
export default {
  props: ['images'],

  methods :{
    first(idx){
      var res = ['carousel-item']
      if (idx == 1){
        res.push('active')
      }
      return res
    }
  }
}
</script>