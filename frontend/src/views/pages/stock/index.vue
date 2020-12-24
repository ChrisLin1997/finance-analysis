<template lang="pug">
.stock
  //- .title {{ stockTitle }}
  header
    .title
      span {{ stockInfo.name }}
      span 509.00
      //- span {{ stockInfo.price }}
    .subtitle
      span {{ stockInfo.id + stockInfo.type }}
      span -0.92 (-0.70%)

  body
    .chart
      price-chart(:dateList="stockInfo.date" :priceList="stockInfo.price")
    .merchant
      .buy

      .sell
  footer

</template>

<script>
import { ref } from 'vue'
import router from '@/router'
import PriceChart from '@/components/price-chart'
import {
  getTwstockHistoryService,
  getTwstockInfoService,
  getTwstockMerchantService,
} from '@/api/twstock'

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

      const submitData = {
        stockNo: stockNo.value,
      }

      const historyPrice = await getTwstockHistoryService(submitData)
      const info = await getTwstockInfoService(submitData)
      const merchant = await getTwstockMerchantService(submitData)
      stockInfo.value = { ...info, ...historyPrice, ...merchant }
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
}

.chart {
  width: 60%;
}

.merchant {
  width: 40%;
  display: flex;
  & > * {
    width: 50%;
  }
}
</style>
