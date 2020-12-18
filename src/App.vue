<template lang="pug">
#app
  header-bar
  aside-menu
  //- router-link(to="/") Home
  //- router-link(to="/about") About
router-view
</template>

<script>
import AsideMenu from '@/components/aside-menu'
import HeaderBar from '@/components/header-bar'
import { getStockChartService } from '@/api/stock'

export default {
  name: 'app',

  components: {
    AsideMenu,
    HeaderBar,
  },

  setup () {
    const getStickChart = async () => {
      const result = await getStockChartService({ symbolId: 2330, oddLot: false })
      console.log(result)
    }
    getStickChart()
  },
}
</script>

<style lang="scss">
@import '@/assets/index.scss';
#app {
  width: 100vw;
  height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: $background;
}
</style>
