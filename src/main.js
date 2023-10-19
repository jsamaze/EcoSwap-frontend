
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


axios.defaults.withCredentials=true;

const app = Vue.createApp(App)
app.use(VueAxios, axios)

const pinia = createPinia()
app.use(pinia)
export const userStore = useUserStore()
export const loadStore = useLoadStore()

app.use(ToastPlugin)

app.use(router)

app.use(LoadingPlugin, {
    opacity : 0.1,
},{
})

app.mount('#app')
