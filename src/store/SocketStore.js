import { defineStore } from "pinia";

export const useSocketStore = defineStore('socket',{
  state: () => ({
    connected : false
  }),

})

