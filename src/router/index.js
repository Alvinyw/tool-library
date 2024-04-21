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
        component: () => import( /* webpackChunkName: "image" */ '@/views/imageViewer/index'),
        meta: {
          name: '图片编辑器'
        },
      },
      {
        path: '/imgFormatConvert',
        name: 'ImgFormatConvert',
        component: () => import( /* webpackChunkName: "image" */ '@/views/imgFormatConvert/index'),
        meta: {
          name: '图片格式转换'
        },
      },
      {
        path: '/imgCompress',
        name: 'ImgCompress',
        component: () => import( /* webpackChunkName: "image" */ '@/views/imgCompress/index'),
        meta: {
          name: '图片自定义压缩'
        },
      },
      {
        path: '/imgTextSearch',
        name: 'ImgTextSearch',
        component: () => import( /* webpackChunkName: "image" */ '@/views/imgTextSearch/index'),
        meta: {
          name: '图片文本搜索'
        },
      },
      {
        path: '/excelSplit',
        name: 'ExcelSplit',
        component: () => import( /* webpackChunkName: "excel" */ '@/views/excel/excelSplit/index'),
        meta: {
          name: 'excel文件拆分'
        },
      },
      {
        path: '/excelFormatConvert',
        name: 'ExcelFormatConvert',
        component: () => import( /* webpackChunkName: "excel" */ '@/views/excel/excelFormatConvert/index'),
        meta: {
          name: 'excel文件格式转换'
        },
      },
      {
        path: '/excelZip',
        name: 'ExcelZip',
        component: () => import( /* webpackChunkName: "excel" */ '@/views/excel/excelZip/index'),
        meta: {
          name: 'excel文件压缩'
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