import { createApp } from 'vue'
import { createPinia } from 'pinia'


import 'bootstrap/dist/css/bootstrap.min.css' // importing the bootstrap details to your webpage is highly important in this case.
import 'bootstrap-icons/font/bootstrap-icons.css' // importing the bootstrap icons will allow the user click on the action.

import './style.css'

import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.mount('#app')
