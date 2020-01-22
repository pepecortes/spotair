import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import Login from './Login.vue'

Vue.config.productionTip = false
Vue.config.devtools = false

Vue.use(BootstrapVue)

// Start the Vue Root instance
const app = new Vue({
  el: '#login',
  components: { Login },
  template: '<Login/>',
})


