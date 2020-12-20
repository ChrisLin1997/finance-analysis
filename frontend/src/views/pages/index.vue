<template lang="pug">
header-bar
aside-menu
main
  router-view
</template>

<script>
import AsideMenu from '@/components/aside-menu'
import HeaderBar from '@/components/header-bar'
import { getStockChartService } from '@/api/stock'

export default {
  name: 'layout',

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

<style>
main {
  padding: 64px 0 0 284px;
  width: 100%;
  height: 100%;
}
</style>
