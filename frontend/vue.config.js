module.exports = {
  // publicPath: '/finance-analysis/',
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
