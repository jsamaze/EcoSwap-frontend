import { defineStore } from "pinia";

export const useItemChatStore = defineStore('itemChat',{
  state: () => ({
    username : undefined,
    items: [],
    chatId : undefined,
  }),

})