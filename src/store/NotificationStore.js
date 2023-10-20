import { defineStore } from "pinia";

export const useNotificationStore = defineStore('notification',{
  state: () => ({
    usernameFrom : undefined,
    event : undefined,
    time: undefined,
  }),

})