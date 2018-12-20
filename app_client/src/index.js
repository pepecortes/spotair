import Vue from 'vue'
import App from './App.vue'
import App2 from './App2.vue'

Vue.config.productionTip = false



// CHECK require.context https://vuejs.org/v2/guide/components-registration.html
// so that common components are imported without need for additional imports
// on each module

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})

new Vue({
  el: '#app2',
  template: '<App2/>',
  components: { App2 }
})
