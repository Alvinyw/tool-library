import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

import { getUserInfo } from './utils/session'

NProgress.configure({
  showSpinner: false,
})

const setThemeColor = function (color) {
  document.body.style.setProperty('--themeColor', color)
}

const WHITE_LIST = [
  'Login'
]

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()
  setThemeColor("#F85A52")

  // if (WHITE_LIST.indexOf(to.name) !== -1) {
  //   next()
  //   NProgress.done()
  //   return true
  // }

  // const userInfo = getUserInfo();

  // const { token = '' } = userInfo || {};

  // if (!token) {
  //   next({ name: 'Login' })
  //   NProgress.done()
  //   return
  // }

  // store.dispatch("user/updateUserInfo", userInfo);

  // 进入页面
  next()
  NProgress.done()
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})