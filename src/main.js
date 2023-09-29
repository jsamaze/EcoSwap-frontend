
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

import * as Vue from 'vue'
import App from './App.vue'
import VueAxios from 'vue-axios'
import axios from 'axios'
import {createPinia} from 'pinia'

axios.defaults.withCredentials=true;

const app = Vue.createApp(App)
app.use(VueAxios, axios)

const pinia = createPinia()

app.use(pinia)

import router from './router'
app.use(router)

app.mount('#app')
