import { createApp } from 'vue'

import AppVue from './App.vue'
import router from './route'
import './style/index.css'
import vueTree from 'vue3-org'
import '../lib/style.css'

createApp(AppVue).use(router).use(vueTree).mount('#app')
