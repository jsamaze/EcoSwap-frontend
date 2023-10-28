<script setup>
import { vElementVisibility } from '@vueuse/components';
</script>

<template>
        <div class="circle" data-prog="25">
            <ve-progress style="margin-top: 5%;" :progress="current" :color="'#44571c'" :emptyColor="'#FFFFFF'" ></ve-progress>
            <svg width="250" height="250">
              <circle r="100" cx="125" cy="125" class="track"></circle>
              <circle r="100" cx="125" cy="125" class="progress"></circle>
            </svg>
            <div class="circle-inner">
              <h1  v-element-visibility="animateCircle">{{percent}}%</h1>
            </div>
          </div>
</template>

<style scoped>

@import "../assets/homepage.css";
</style>

<script>

export default {
    props : ['percent'],
    data(){
        return {
            current : 0,
            curState : false,
            counter : null,

        }
    },
    methods: {
        animateCircle(state){
            console.log("seen", this.curState,state, state && !this.curState)
            if (state && !this.curState){
                this.curState = true
                var vm = this
                this.counter = setInterval(function () {
                    // console.log('00')
                    if (vm.current >= vm.percent) {
                    clearInterval(vm.counter);
                    } else {
                    vm.current += 1;
                    }
                }, 500/this.percent);
            } else if (!state && this.curState){
                this.curState = false
                this.current = 0

            }
        }
    }
}
</script>