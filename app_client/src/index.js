import Vue from 'vue'
import VueRouter from 'vue-router'
import AsyncComputed from 'vue-async-computed'
import BootstrapVue from 'bootstrap-vue'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import * as VueGoogleMaps from "vue2-google-maps"
import VueLoading from 'vuejs-loading-plugin'
import {SearchType} from '../../app_lib/constants'

import Home from './views/Home.vue'

Vue.config.productionTip = false
Vue.config.devtools = false

// To be able to use async computed properties
Vue.use(AsyncComputed)

// Create an axios instance and set some defaults for authorization...
var axios = Axios.create()
axios.defaults.baseURL = process.env.API_URL
axios.defaults.timeout = 10000 // wait 10 seconds before giving up

Vue.use(VueGoogleMaps, {
	load: {
		key: process.env.GOOGLE_API_KEY,
		libraries: 'places'
	}
})

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)
Vue.use(VueLoading)

Vue.directive('focus', {
  // Get focus when the bound element is inserted into the DOM
  inserted: function (el) {el.focus()}
})

// Define or input route components
// They can be lazily loaded (and webpack will split the js in chunks)
const Search = () => import('./views/Search.vue')
const Accueil = () => import('./views/Accueil.vue')
const Map = () => import('./views/Map.vue')
const Galeries = () => import('./views/Galeries.vue')
const FileUploadForm = () => import('./views/FileUpload.vue')
const UserProfileForm = () => import('./views/UserProfileForm.vue')

// Define the routes
const routes = [
  { path: '/', component: Accueil },
  { path: '/map', component: Map },
  { path: '/pictadd', component: FileUploadForm },
  { path: '/profileForm', component: UserProfileForm },
  { path: '/search', component: Search },
  { path: '/galeries', component: Galeries },
  { path: '/galeries/:id', component: Galeries },
  { path: '/myPendingPictures/:id(\\d+)?',
		component: Search,
		props: {
			searchType: SearchType.BY_USER_PENDING,
			thumbnailLocation: process.env.STORAGE_URL + process.env.UPLOAD_LOCATION,
			photoLocation: process.env.STORAGE_URL + process.env.UPLOAD_LOCATION,
			title: "Mes photos",
			subtitle: "en attente de validation",
		} 
	},
  { path: '/myValidatedPictures/:id(\\d+)?',
		component: Search,
		props: { 
			searchType: SearchType.BY_USER_VALIDATED,
			title: "Mes photos",
			subtitle: "publiées",
		} 
	},
  { path: '/myRejectedPictures/:id(\\d+)?',
		component: Search, 
		props: { 
			searchType: SearchType.BY_USER_REJECTED,
			thumbnailLocation: process.env.STORAGE_URL + process.env.UPLOAD_LOCATION,
			photoLocation: process.env.STORAGE_URL + process.env.UPLOAD_LOCATION,
			title: "Mes photos",
			subtitle: "non publiées",
		}
	},
]

// Create the router
const router = new VueRouter({
	mode: 'history',
  routes: routes,
  linkActiveClass: "active", 
})

// Start the Vue Root instance
const app = new Vue({
  el: '#home',
  components: { Home },
  template: '<Home/>',
  router,
})


