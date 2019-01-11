import Vue from 'vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Admin from './Admin.vue'

// Import bootstrap style
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// CHECK require.context https://vuejs.org/v2/guide/components-registration.html
// so that common components are imported without need for additional imports
// on each module

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)

// Define or input route components
import AerodromeForm from './components/AerodromeForm.vue'
import ThemeForm from './components/ThemeForm.vue'
import AnneeForm from './components/AnneeForm.vue'
import GalerieForm from './components/GalerieForm.vue'
import PhotographeForm from './components/PhotographeForm.vue'

// Define the routes
const routes = [
  { path: '/admin/aerodromes', component: AerodromeForm },
  { path: '/admin/themes', component: ThemeForm },
  { path: '/admin/annees', component: AnneeForm },
  { path: '/admin/galeries', component: GalerieForm },
  { path: '/admin/photographes', component: PhotographeForm },
]

// Create the router
const router = new VueRouter({
	mode: 'history',
  routes: routes
})

// Start the Vue Root instance
const app = new Vue({
  el: '#admin',
  components: { Admin },
  template: '<Admin/>',
  router,
})


