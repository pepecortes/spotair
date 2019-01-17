import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)

import Pictadd from './Pictadd.vue'

const app = new Vue({
  el: '#pictadd',
  components: { Pictadd },
  template: '<Pictadd/>',
})


