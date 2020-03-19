import Vue from 'vue'
import VueRouter from 'vue-router'
import AsyncComputed from 'vue-async-computed'
import BootstrapVue from 'bootstrap-vue'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import VueLoading from 'vuejs-loading-plugin'

import Test from './Test.vue'

// Import bootstrap style
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// CHECK require.context https://vuejs.org/v2/guide/components-registration.html
// so that common components are imported without need for additional imports
// on each module

Vue.config.productionTip = false
Vue.config.devtools = false

// Create an axios instance and set some defaults for authorization...
var axios = Axios.create()
axios.defaults.baseURL = process.env.API_URL
axios.defaults.timeout = 10000 // wait 10 seconds before giving out

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)
Vue.use(VueLoading)
Vue.use(AsyncComputed)

Vue.directive('focus', {
  // When the bound element is inserted into the DOM...
  inserted: function (el) {
    // Focus the element
    console.log("IN FOCUS")
    el.focus()
  }
})

// Define or input route components
import ProfileForm from './components/ProfileForm.vue'
import Palette from './components/Palette.vue'
//import Test1 from './components/Test1.vue'
import TwitterFeedTest from './components/testComponents/TwitterFeed.vue'

// Define the routes
const routes = [
  { path: '/admin/profileForm', component: ProfileForm },
  { path: '/test/colors', component: Palette },
  //{ path: '/test/test1', component: Test1 },
  { path: '/test/twitterFeed', component: TwitterFeedTest },
]

// Create the router
const router = new VueRouter({
	mode: 'history',
  routes: routes
})

// Start the Vue Root instance
const app = new Vue({
  el: '#test',
  components: { Test },
  template: '<Test/>',
  router,
})
