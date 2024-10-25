import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index.js'
//import PortalVue from 'portal-vue'
// Import our custom CSS
import './scss/styles.scss'
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import { getUser } from './utils/auth'
//import Alert from 'bootstrap/js/dist/alert';

// or, specify which plugins you need:

// Import all of Bootstrap's JS
//import * as bootstrap from 'bootstrap'


const app = createApp(App);

  app.use(Toast, {
    position: POSITION.TOP_RIGHT
  });

  app.use(router);

 
getUser().then(() => {
  app.mount('#app')
})
//Vue.use(AlertPlugin)