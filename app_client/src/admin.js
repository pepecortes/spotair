import Vue from 'vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import Admin from './Admin.vue'

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

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)

// Define or input route components
import AerodromeForm from './components/AerodromeForm.vue'
import ThemeForm from './components/ThemeForm.vue'
import AnneeForm from './components/AnneeForm.vue'
import GalerieForm from './components/GalerieForm.vue'
import CompagnieForm from './components/CompagnieForm.vue'
import PhotographeForm from './components/PhotographeForm.vue'
import UserForm from './components/UserForm.vue'
import ConstructeurForm from './components/ConstructeurForm.vue'
import ModeleForm from './components/ModeleForm.vue'
import AvionForm from './components/AvionForm.vue'
import AppareilForm from './components/AppareilForm.vue'
import PhotoForm from './components/PhotoForm.vue'

// Define the routes
const routes = [
  { path: '/admin/aerodromes', component: AerodromeForm },
  { path: '/admin/themes', component: ThemeForm },
  { path: '/admin/annees', component: AnneeForm },
  { path: '/admin/galeries', component: GalerieForm },
  { path: '/admin/compagnies', component: CompagnieForm },
  { path: '/admin/photographes', component: PhotographeForm },
  { path: '/admin/constructeurs', component: ConstructeurForm },
  { path: '/admin/modeles', component: ModeleForm },
  { path: '/admin/avions', component: AvionForm },
  { path: '/admin/appareils', component: AppareilForm },
  { path: '/admin/photos', component: PhotoForm },
  { path: '/admin/users', component: UserForm },
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


