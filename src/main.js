import { createApp } from 'vue'
import App from './App.vue'
import mitt from 'mitt'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import dotenv from 'dotenv'

dotenv.config()
const app = createApp(App)
const emitter = mitt();
app.config.globalProperties.emitter = emitter
app.use(VueSweetalert2);
app.mount('#app')
