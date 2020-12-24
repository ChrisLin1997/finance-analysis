<template lang="pug">
.stock
  header
    //- .title
      span {{ stockInfo.name }}
      span 509.00
      //- span {{ stockInfo.price }}
    //- .subtitle
      span {{ stockInfo.id + stockInfo.type }}
      span -0.92 (-0.70%)

  body
    .chart
      //- price-chart(:dateList="stockInfo.date" :priceList="stockInfo.price")
    .merchant
      h3 交易資訊
      .type
        div(v-for="type of merchantList" :key="type.code")
          h3(:class="type.code") {{ type.label }}
          .merchant-item(v-for="(item, index) of stockInfo[type.code]" :key="index" :class="type.code")
            .price {{ convertPrice(item.price) }}
            .amount {{ item.amount }}
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
    const merchantList = [
      { label: '委買', code: 'buy' },
      { label: '委賣', code: 'sell' },
    ]

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
      stockInfo.value = { ...merchant }
    }
    getTwstockInfo()

    const convertPrice = (value) => {
      return Number(value).toFixed(2)
    }

    return {
      merchantList,
      stockInfo,

      convertPrice,
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
}

.type {
  display: flex;
  & > * {
    width: 50%;
  }
}

.merchant-item {
  display: flex;
  justify-content: space-between;
}

.buy {
  flex-direction: row-reverse;
  color: $up;
}

.sell {
  color: $down;
}
</style>
