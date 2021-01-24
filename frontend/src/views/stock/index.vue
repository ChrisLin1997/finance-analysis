<template lang="pug">
.stock
  .area
    .content
      main
        fa-chart.chart(:options="priceChartOption" color="blue")
          .info
            .title
              span {{ stockInfo.name }}
              span.price {{ stockInfo.price }}
              span.currency {{ stockInfo.currency }}
            .subtitle
              span {{ stockInfo.id }}
              span {{ stockInfo.change }} ({{ stockInfo.changePercent }})
        merchant.merchant(:stockNo="userSearch")

  .area
    .content
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
import useStock from './stock-info'
import Merchant from './merchant/index'

export default {
  name: 'stock',

  components: {
    FaChart,
    Merchant,
  },

  setup () {
    // search
    const userSearch = ref('')
    // 報表
    const { priceChartOption, chartList, getAllInfo, stockInfo } = useStock(userSearch)

    watchEffect(() => {
      userSearch.value = router.currentRoute.value.query.stockNo
      if (userSearch.value) getAllInfo()
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
.content {
  padding-top: 32px;
}

main {
  display: flex;
  justify-content: space-between;
  height: 360px;
}

.chart {
  width: 55%;
}

.merchant {
  width: 45%;
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

  .price {
    margin-left: 48px;
  }

  .currency {
    margin: 12px 0 0 4px;
    font-size: 12px;
  }
}

.chart-item {
  width: 48%;
}
</style>
