import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Import our custom configuration file
import AppConfig from '@/app.config'

// Consume our injected configuration values
console.log( `Vue Site Launching - ${AppConfig.versionNumber}-${AppConfig.envName}` )

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
