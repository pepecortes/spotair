import Vue from 'vue'
//import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

// Import bootstrap style
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// CHECK require.context https://vuejs.org/v2/guide/components-registration.html
// so that common components are imported without need for additional imports
// on each module

Vue.config.productionTip = false

//Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)

// Define or input route components
import Login from './components/Login.vue'

//// Define the routes
//const routes = [
  ////{ path: '/login', component: Login },
//]

//// Create the router
//const router = new VueRouter({
	//mode: 'history',
  //routes: routes
//})

// Start the Vue Root instance
const app = new Vue({
  el: '#login',
  components: { Login },
  template: '<Login/>',
  //router,
})


