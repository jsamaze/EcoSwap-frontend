import { defineStore } from "pinia";

export const useChatStore = defineStore('chat',{
  state: () => ({
    sender : undefined,
    textContent : undefined,
    createdAt : undefined,
    chatId : undefined,
  }),

})

