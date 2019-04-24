import Vue from 'vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import Home from './Home.vue'

//TEST CUSTOM DIRECTIVE
//import './directives/vue-placeholders'
//Vue.directive('phimg', require('./vue-placeholders-image'))
Vue.directive('phtxt', require('./directives/vue-placeholders/dummy'))
//Vue.directive('phtxt', require('./directives/vue-placeholders/vue-placeholders-text'))

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

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)

// Define or input route components
import Accueil from './components/Accueil.vue'

// Define the routes
const routes = [
  { path: '/cover', component: Accueil },
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


