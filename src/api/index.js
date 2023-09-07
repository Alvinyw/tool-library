import Vue from 'vue'
import * as app from './app'
import * as user from './user'

Vue.prototype.$api = {
  app,
  user
}