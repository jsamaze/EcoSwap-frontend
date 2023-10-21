import { io } from "socket.io-client"
import {ChatStore, ItemChatStore, NotificationStore} from "./main"
export const socket = io (`${import.meta.env.VITE_BACKEND}`, {
    withCredentials : true,
    autoConnect : false,
})

socket.on("itemchat",(from,items)=>{
    // alert("update")
    // alert(from)
    // alert(ItemChatStore.items.sort().toString()==items.sort().toString())
    // alert(ItemChatStore.username && ItemChatStore.username == from)
    if (ItemChatStore.username && ItemChatStore.username == from ){
        console.log(items)
        ItemChatStore.items = items
    }
})

socket.on("message",(message) => {
    ChatStore.sender = message.sender
    ChatStore.textContent = message.textContent
    ChatStore.createdAt = message.createdAt
})

socket.onAny(( eventName, username) => {
    // let instance = app.$toast.open(username + ' ' + eventName);

    NotificationStore.usernameFrom = username;
    NotificationStore.event=eventName;
    NotificationStore.time = Date.now()
})



