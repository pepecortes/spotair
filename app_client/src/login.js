import Vue from 'vue'
import VueSession from 'vue-session'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueSession)
Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)

import Login from './Login.vue'

//this.$session.set('pepe', 'putoamo')
//const out = this.$session.get('pepe')
//console.log("SESSION TEST " + JSON.stringify(out))

const app = new Vue({
  el: '#login',
  components: { Login },
  template: '<Login/>',
})


