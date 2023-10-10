import Vue from 'vue'
import App from './App.vue'

import store from './store'
import router from './router'

import ElementUI from 'element-ui'
import '@/styles/theme/index.css'
Vue.use(ElementUI)

import './api' // 接口文件
import './utils' // 工具库
import './directive' // 自定义全局指令
import './filters' // 自定义全局过滤器
import './styles/index.scss' // 全局样式文件
import './permission'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
