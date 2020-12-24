<template lang="pug">
.stock
  //- .title {{ stockTitle }}
  header
    .title
      span 台積電
      span 130.96
    .subtitle
      span 2330 上市
      span -0.92 (-0.70%)

  body
    .chart
      price-chart(:dateList="stockInfo.date" :priceList="stockInfo.price")
    .merchant
  footer

</template>

<script>
import { ref } from 'vue'
import router from '@/router'
import { getTwstockHistoryService, getTwstockInfoService } from '@/api/twstock'
import PriceChart from '@/components/price-chart'

export default {
  name: 'stock',

  components: {
    PriceChart,
  },

  setup () {
    const stockNo = ref(router.currentRoute.value.params.stockNo)
    const stockInfo = ref({
      id: '',
      name: '',
      type: '',
      industy: '',
      ipoTime: '',
      price: [],
      date: [],
    })

    const getTwstockInfo = async () => {
      if (stockNo.value === '') return

      const historyPrice = await getTwstockHistoryService({ stockNo: stockNo.value })
      const info = await getTwstockInfoService({ stockNo: stockNo.value })
      stockInfo.value = { ...info, ...historyPrice }
    }
    getTwstockInfo()

    return {
      stockInfo,
    }
  },
}
</script>

<style lang="scss" scoped>
header {
  width: 220px;
  text-align: left;
}

.title {
  display: flex;
  justify-content: space-between;
  font-size: 28px;
}

.subtitle {
  display: flex;
  justify-content: space-between;
}

body {
  margin-top: 24px;
  display: flex;
  .chart {
    width: 60%;
  }
  .merchant {
    width: 40%;
  }
}
</style>
