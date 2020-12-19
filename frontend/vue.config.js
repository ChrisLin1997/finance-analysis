module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: ' @import "@/assets/variable.scss"; ',
      },
    },
  },
}
