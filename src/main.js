
import 'bootstrap/dist/css/bootstrap.css'
import 'cropperjs/dist/cropper.css';

import * as bootstrap from 'bootstrap'
import * as Vue from 'vue'

import App from './App.vue'

import VueAxios from 'vue-axios'
import axios from 'axios'
import {createPinia} from 'pinia'
import router from './router'

import VueLazyLoad from 'vue3-lazyload'


import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

import {LoadingPlugin} from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

import {useUserStore} from './store/UserStore'
import { useLoadStore } from './store/InitialLoadStore';
import { useNotificationStore } from './store/NotificationStore';
import { useChatStore } from './store/ChatStore';
import { useItemChatStore } from './store/ItemChatStore';
import { useSocketStore } from './store/SocketStore';


axios.defaults.withCredentials=true;

const app = Vue.createApp(App)
app.use(ToastPlugin,{
  position : 'top'
})

app.use(VueAxios, axios)

const pinia = createPinia()
app.use(pinia)
export const userStore = useUserStore()
export const loadStore = useLoadStore()
export const notificationStore = useNotificationStore()
export const chatStore = useChatStore()
export const itemChatStore = useItemChatStore()
export const socketStore = useSocketStore()


app.use(router)

app.use(LoadingPlugin, {
    opacity : 0.1,
},{
})
app.use(VueLazyLoad)

app.mount('#app')

axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log(error.response.status)
    if (error.response.status == 401){

        console.log("intercept")
        if(userStore.username){
          userStore.username = undefined;
          userStore.userId = undefined;
          notificationStore.event ='expiredSession'
          notificationStore.time = new Date()
          router.push("/")
        }
        

    }
    return Promise.reject(error);
  });

