const path = require('path')

function resolve(dir) {
  path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.VUE_APP_PUBLICPATH,
  // outputDir: 'vueElement',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    overlay: {
      warnings: false,
      errors: true,
    },
    // https: true,
    proxy: {
      '/api/': {
        // 此处并非和url一致
        // target: 'http://115.150.104.8:8091/pweb', // 内网
        // target: 'http://59d6iy.natappfree.cc', // 外网
        target: 'http://TEST/',
        changeOrigin: true, // 允许跨域
        ws: true,
        pathRewrite: {
          '^/api/': '',
        },
      },
    },
  },
  configureWebpack: {
    name: '',
    resolve: {
      alias: {
        '@': resolve('src'),
        images: '@/assets/images',
        components: '@/components',
        views: '@/views',
        const: '@/const',
      },
    }
  },
}