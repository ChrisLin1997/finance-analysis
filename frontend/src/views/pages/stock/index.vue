<template lang="pug">
.stock
  header
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
.stock {
  margin-top: 44px;
}

header {
  position: relative;
  display: flex;
  background-color: $active-background;
  box-shadow: 0 0 6px 2px #111;
}

.chart {
  width: 60%;
}

.merchant {
  width: 40%;
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
