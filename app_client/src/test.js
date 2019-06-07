import Vue from 'vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import CarouselTest from './CarouselTest.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

// Create an axios instance and set some defaults for authorization...
var axios = Axios.create()
axios.defaults.baseURL = process.env.API_URL
axios.defaults.timeout = 10000 // wait 10 seconds before giving out

Vue.use(VueAxios, axios)

const app = new Vue({
  el: '#test',
  components: { CarouselTest },
  template: '<CarouselTest/>',
})


