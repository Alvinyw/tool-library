import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({
  showSpinner: false,
})

const setThemeColor = function (color) {
  document.body.style.setProperty('--themeColor', color)
}

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()
  setThemeColor("#F85A52")

  // 进入页面
  next()
  NProgress.done()
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})