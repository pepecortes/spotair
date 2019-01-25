import Vue from 'vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import Pictadd from './Pictadd.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Create an axios instance and set some defaults for authorization...
var axios = Axios.create()
axios.defaults.baseURL = process.env.API_URL

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)

// Define or input route components
import ProfileForm from './components/ProfileForm.vue'

// Define the routes
const routes = [
  { path: '/pictadd/profile', component: ProfileForm },
]

// Create the router
const router = new VueRouter({
	mode: 'history',
  routes: routes
})

const app = new Vue({
  el: '#pictadd',
  components: { Pictadd },
  template: '<Pictadd/>',
  router,
})

