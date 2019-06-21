import Vue from 'vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import Home from './Home.vue'
import * as VueGoogleMaps from "vue2-google-maps"

// Import bootstrap style
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// CHECK require.context https://vuejs.org/v2/guide/components-registration.html
// so that common components are imported without need for additional imports
// on each module

Vue.config.productionTip = false

// Create an axios instance and set some defaults for authorization...
var axios = Axios.create()
axios.defaults.baseURL = process.env.API_URL
axios.defaults.timeout = 10000 // wait 10 seconds before giving out

//TEST: GOOGLE MAPS API
Vue.use(VueGoogleMaps, {
	load: {
		key: process.env.GOOGLE_API_KEY,
		libraries: 'places'
	}
})

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)

// Define or input route components
import Accueil from './components/Accueil.vue'
import Map from './components/Map.vue'
import ExpoGalerie from './components/ExpoGalerie.vue'

// Define the routes
const routes = [
  { path: '/cover', component: Accueil },
  { path: '/map', component: Map },
  //TEST
  { path: '/galeries/:id(\\d+)?', component: ExpoGalerie },
]

// Create the router
const router = new VueRouter({
	mode: 'history',
  routes: routes
})

// Start the Vue Root instance
const app = new Vue({
  el: '#home',
  components: { Home },
  template: '<Home/>',
  router,
})


