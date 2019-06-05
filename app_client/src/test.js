import Vue from 'vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import CarouselTest from './CarouselTest.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

//TEST
//import FileUploadForm from './components/FileUpload.vue'

const app = new Vue({
  el: '#test',
  components: { CarouselTest },
  template: '<CarouselTest/>',
})


