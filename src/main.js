// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import VueResource from 'vue-resource'
// 引入echarts
import echarts from 'echarts'

Vue.prototype.$echarts = echarts 
Vue.config.productionTip = false

Vue.use(iView)
Vue.use(VueResource) 

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
