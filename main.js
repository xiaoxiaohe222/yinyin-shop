
// #ifndef VUE3
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'
// 引入封装的api
import request from './api/request.js'
Vue.prototype.$http = request
//引入vuex
import store from './store'

const app = new Vue({
    ...App,
	store
})

app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif