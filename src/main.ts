import { createApp } from 'vue'

import AppVue from './App.vue'
import router from './route'
import './style/index.css'

createApp(AppVue).use(router).mount('#app')
