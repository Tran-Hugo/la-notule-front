import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as bootstrap from 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
<script src="https://js.stripe.com/v3/"></script>



createApp(App).use(store).use(router).use(bootstrap).mount('#app')
