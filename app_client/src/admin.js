import Vue from 'vue'
import VueRouter from 'vue-router'
import AsyncComputed from 'vue-async-computed'
import BootstrapVue from 'bootstrap-vue'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import VueLoading from 'vuejs-loading-plugin'
import Admin from './Admin.vue'
import * as VueGoogleMaps from "vue2-google-maps"
import {SearchType} from '../../app_lib/constants'

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

Vue.use(VueGoogleMaps, {
	load: {
		key: process.env.GOOGLE_API_KEY,
		libraries: 'places'
	}
})

Vue.directive('focus', {
  // Get focus when the bound element is inserted into the DOM
  inserted: function (el) {el.focus()}
})

// Define route components
// They can be lazily loaded (and webpack will split the js in chunks)
const FormAerodrome = () => import('./components/FormAerodrome.vue')
const FormTheme = () => import('./components/FormTheme.vue')
const FormAnnee = () => import('./components/FormAnnee.vue')
const FormGalerie = () => import('./components/FormGalerie.vue')
const FormCompagnie = () => import('./components/FormCompagnie.vue')
const FormPhotographe = () => import('./components/FormPhotographe.vue')
const FormUser = () => import('./components/FormUser.vue')
const FormConstructeur = () => import('./components/FormConstructeur.vue')
const FormModele = () => import('./components/FormModele.vue')
const FormAvion = () => import('./components/FormAvion.vue')
const FormAppareil = () => import('./components/FormAppareil.vue')
const FormPhoto = () => import('./components/FormPhoto.vue')
const ThePhotoValidation = () => import('./components/ThePhotoValidation.vue')
const UserProfileForm = () => import('./views/UserProfileForm.vue')
const Search = () => import('./views/Search.vue')

const routes = [
	// tab can be: "modify", "new",	"fusion"
  { path: '/admin', component: ThePhotoValidation },
  { path: '/admin/aerodromes/:tab?/:id?', component: FormAerodrome },
  { path: '/admin/themes/:tab?/:id?', component: FormTheme },
  { path: '/admin/annees/:tab?/:id?', component: FormAnnee },
  { path: '/admin/galeries/:tab?/:id?', component: FormGalerie },
  { path: '/admin/compagnies/:tab?/:id?', component: FormCompagnie },
  { path: '/admin/photographes/:tab?/:id?', component: FormPhotographe },
  { path: '/admin/constructeurs/:tab?/:id?', component: FormConstructeur },
  { path: '/admin/modeles/:tab?/:id?', component: FormModele },
  { path: '/admin/avions/:tab?/:id?', component: FormAvion },
  { path: '/admin/appareils/:tab?/:id?', component: FormAppareil },
  { path: '/admin/photos/:tab?/:id?', component: FormPhoto },
  { path: '/admin/users/:tab?/:id?', component: FormUser },
  { path: '/admin/validatePhotos', component: ThePhotoValidation },
  { path: '/admin/recentlyModified',
		component: Search,
		props: {
			adminSearch: true,
			searchType: SearchType.RECENT_MODIFIED,
			title: "Photos récemment ajoutées/modifiées",
		 }
	},
  { path: '/admin/profileForm', component: UserProfileForm },
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


