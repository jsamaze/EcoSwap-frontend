import { io } from "socket.io-client"
import {chatStore, itemChatStore, notificationStore,socketStore} from "./main"
export const socket = io (`${import.meta.env.VITE_BACKEND}`, {
    withCredentials : true,
    autoConnect : false,
})

socket.on("connect", () => {
    notificationStore.usernameFrom = null;
    notificationStore.event="connect";
    notificationStore.time = Date.now()
    socketStore.connected = true
});



socket.on("disconnect", () => {
    notificationStore.usernameFrom = null;
    notificationStore.event="disconnect";
    notificationStore.time = Date.now()
    socketStore.connected = false
});

socket.on("connect_error", () => {
    notificationStore.usernameFrom = null;
    notificationStore.event="connect_error"; //failed to establish connection
    notificationStore.time = Date.now()
    socketStore.connected = false

});



socket.on("itemchat",(from,items)=>{
    // alert("update")
    // alert(from)
    // alert(ItemChatStore.items.sort().toString()==items.sort().toString())
    // alert(ItemChatStore.username && ItemChatStore.username == from)
    if (itemChatStore.username && itemChatStore.username == from ){
        console.log(items)
        itemChatStore.items = items
    }
})

socket.on("message",(message) => {
    chatStore.sender = message.sender
    chatStore.textContent = message.textContent
    chatStore.createdAt = message.createdAt
})

socket.onAny(( eventName, username) => {
    // let instance = app.$toast.open(username + ' ' + eventName);

    notificationStore.usernameFrom = username;
    notificationStore.event=eventName;
    notificationStore.time = Date.now()
})



