import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
//import PortalVue from 'portal-vue'
// Import our custom CSS
import './scss/styles.scss'


//import Alert from 'bootstrap/js/dist/alert';

// or, specify which plugins you need:

// Import all of Bootstrap's JS
//import * as bootstrap from 'bootstrap'


const app = createApp(App).mount('#app')

//Vue.use(AlertPlugin)