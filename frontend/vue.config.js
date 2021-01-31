module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/finance-analysis/' : '/',
  css: {
    loaderOptions: {
      scss: {
        prependData: ' @import "@/assets/scss/variable.scss"; ',
      },
    },
  },

  devServer: {
    https: false,
  },
}
