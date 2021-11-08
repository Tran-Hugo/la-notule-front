import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import interceptor from './services/interceptors.js'
import "leaflet/dist/leaflet.css";

interceptor();


createApp(App).use(store).use(router).mount('#app')
