
import 'bootstrap/dist/css/bootstrap.css'
import 'cropperjs/dist/cropper.css';

import * as bootstrap from 'bootstrap'
import * as Vue from 'vue'
import App from './App.vue'
import VueAxios from 'vue-axios'
import axios from 'axios'
import {createPinia} from 'pinia'
import router from './router'
import {useUserStore} from './store/UserStore'
import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import {LoadingPlugin} from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import { useLoadStore } from './store/InitialLoadStore';
import { useNotificationStore } from './store/NotificationStore';
import { useChatStore } from './store/ChatStore';
import { useItemChatStore } from './store/ItemChatStore';


axios.defaults.withCredentials=true;

const app = Vue.createApp(App)
app.use(VueAxios, axios)

const pinia = createPinia()
app.use(pinia)
export const userStore = useUserStore()
export const loadStore = useLoadStore()
export const notificationStore = useNotificationStore()
export const chatStore = useChatStore()
export const itemChatStore = useItemChatStore()

app.use(ToastPlugin)

app.use(router)

app.use(LoadingPlugin, {
    opacity : 0.1,
},{
})

axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log(error)
    if (error.status == 401){
        console.log("intercept")
        UserStore.username = undefined;
        router.go(0)
    }
    return Promise.reject(error);
  });

app.mount('#app')