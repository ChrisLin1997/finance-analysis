<template lang="pug">
.stock
  header
    fa-chart.chart(:options="priceChartOption" color="blue")
      .info
        .title
          span {{ stockInfo.name }}
          span.currency {{ stockInfo.currencyPrice }}
        .subtitle
          span {{ stockInfo.id }}
          span {{ stockInfo.variation }} ({{ stockInfo.percent }}%)
    merchant(:stockNo="userSearch")

  main
    fa-chart.chart-item(
      v-for="chart of chartList"
      :key="chart.code"
      :color="chart.color"
      :options="chart.option"
    )
      awesome-icon(:icon="chart.icon")
      span {{ chart.label }}

</template>

<script>
import { ref, watchEffect } from 'vue'
import router from '@/router'
import FaChart from '@/components/fa-chart'
import useStockInfo from './stock'
import useCharts from './chart/index'
import Merchant from './merchant/index'

export default {
  name: 'stock',

  components: {
    FaChart,
    Merchant,
  },

  setup () {
    // 顯示交易類型

    // 取得股票資訊
    const { stockInfo } = useStockInfo()

    // 報表
    const { priceChartOption, chartList } = useCharts(stockInfo)

    // search
    const userSearch = ref('')
    watchEffect(() => {
      userSearch.value = router.currentRoute.value.query.stockNo
      // getMerchatInfo(userSearch.value)
      // update api
    })

    return {
      userSearch,

      stockInfo,

      priceChartOption,
      chartList,
    }
  },
}
</script>

<style lang="scss" scoped>
header {
  position: relative;
  display: flex;
  background-color: $active-background;
  box-shadow: 0 0 6px 2px #111;
}

.chart {
  width: 60%;
}

.info {
  width: fit-content;

  .title,
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 14px;

    &:first-child {
      font-size: 24px;
    }
  }
}

.currency {
  margin-left: 24px;
  &:after {
    content: ' NTD';
    font-size: 8px;
  }
}

// center
main {
  margin-top: 48px;
  display: flex;
  justify-content: space-between;
  height: 320px;

  .chart-item {
    width: 48%;
  }
}
</style>
