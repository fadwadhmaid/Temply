// main.js
import { createApp } from 'vue'
import App from './App.vue'
import 'aos/dist/aos.css'
import router from './router'
import './assets/tailwind.css';
createApp(App).use(router).mount('#app')
