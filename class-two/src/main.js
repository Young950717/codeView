
import Vue from 'vue'
import App from './App'
import router from './router'
import { extendExtend } from './components/extends/index'
Vue.config.productionTip = false
extendExtend(Vue)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
