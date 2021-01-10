module.exports = {
  publicPath: '/finance-analysis/',
  css: {
    loaderOptions: {
      scss: {
        prependData: ' @import "@/assets/variable.scss"; ',
      },
    },
  },

  devServer: {
    https: true,
  },
}
