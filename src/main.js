
import 'bootstrap/dist/css/bootstrap.css'
import * as bootstrap from 'bootstrap'
import * as Vue from 'vue'
import App from './App.vue'
import VueAxios from 'vue-axios'
import axios from 'axios'
import {createPinia} from 'pinia'
import router from './router'
import {useUserStore} from './store/UserStore'

axios.defaults.withCredentials=true;

const app = Vue.createApp(App)
app.use(VueAxios, axios)

const pinia = createPinia()
app.use(pinia)
export const userStore = useUserStore()



app.use(router)

app.mount('#app')
