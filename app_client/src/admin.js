import Vue from 'vue'
import VueRouter from 'vue-router'
import AsyncComputed from 'vue-async-computed'
import BootstrapVue from 'bootstrap-vue'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import VueLoading from 'vuejs-loading-plugin'
import Admin from './Admin.vue'
import {SearchType} from '../../app_lib/constants'

// Import bootstrap style
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.config.devtools = false

// To be able to use async computed properties
Vue.use(AsyncComputed)

// Create an axios instance and set some defaults for authorization...
var axios = Axios.create()
axios.defaults.baseURL = process.env.API_URL
axios.defaults.timeout = 10000 // wait 10 seconds before giving out
axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.JWT_API_KEY}`

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)
Vue.use(VueLoading)

Vue.directive('focus', {
  // Get focus when the bound element is inserted into the DOM
  inserted: function (el) {el.focus()}
})

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
import ValidatePhotos from './components/ValidatePhotos.vue'
import ProfileForm from './components/ProfileForm.vue'
import Search from './components/Search.vue'

// Define the routes
const routes = [
	// tab can be: "modify", "new",	"fusion"
  { path: '/admin/aerodromes/:tab?/:id?', component: AerodromeForm },
  { path: '/admin/themes/:tab?/:id?', component: ThemeForm },
  { path: '/admin/annees/:tab?/:id?', component: AnneeForm },
  { path: '/admin/galeries/:tab?/:id?', component: GalerieForm },
  { path: '/admin/compagnies/:tab?/:id?', component: CompagnieForm },
  { path: '/admin/photographes/:tab?/:id?', component: PhotographeForm },
  { path: '/admin/constructeurs/:tab?/:id?', component: ConstructeurForm },
  { path: '/admin/modeles/:tab?/:id?', component: ModeleForm },
  { path: '/admin/avions/:tab?/:id?', component: AvionForm },
  { path: '/admin/appareils/:tab?/:id?', component: AppareilForm },
  { path: '/admin/photos/:tab?/:id?', component: PhotoForm },
  { path: '/admin/users/:tab?/:id?', component: UserForm },
  { path: '/admin/validatePhotos', component: ValidatePhotos },
  { path: '/admin/recentlyModified', component: Search, props: { adminSearch: true, searchType: SearchType.RECENT_MODIFIED } },
  { path: '/admin/profileForm', component: ProfileForm },
  { path: '/admin/search', component: Search, props: { adminSearch: true } },
  { path: '/admin/editPhoto/:id(\\d+)?', component: Search, props: { adminSearch: true, searchType: SearchType.ID } },
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


