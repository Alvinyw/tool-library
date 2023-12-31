import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/layout'

Vue.use(Router)
const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      component: layout,
      redirect: '/dashboard',
      meta: {
        name: '首页',
        icon: ''
      },
      children: [{
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import( /* webpackChunkName: "main" */ '@/views/dashboard/index'),
        meta: {
          name: '首页'
        },
      },
      {
        path: '/richText',
        name: 'RichText',
        component: () => import( /* webpackChunkName: "main" */ '@/views/richText/index'),
        meta: {
          name: '富文本编辑器'
        },
      },
      {
        path: '/imageEdit',
        name: 'ImageViewer',
        component: () => import( /* webpackChunkName: "main" */ '@/views/imageViewer/index'),
        meta: {
          name: '图片编辑器'
        },
      },
      {
        path: '/imgToBase64',
        name: 'ImgToBase64',
        component: () => import( /* webpackChunkName: "main" */ '@/views/imgToBase64/index'),
        meta: {
          name: '图片转base64'
        },
      },
      ]
    },
    {
      path: '/404',
      name: '404',
      component: () => import( /* webpackChunkName: "home" */ '@/views/notFound'),
    },
    {
      path: '*',
      name: 'notFound',
      redirect: {
        name: '404',
      },
    },
  ],
})

export default router