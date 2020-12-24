<template lang="pug">
header
  .title
    span {{ stockInfo.name }}
    span 509.00
    //- span {{ stockInfo.price }}
  .subtitle
    span {{ stockInfo.id + stockInfo.type }}
    span -0.92 (-0.70%)

.line

body
  .chart(v-if="true")
    price-chart(:dateList="stockInfo.date" :priceList="stockInfo.price")
  .merchant
    h3 交易資訊
    .merchant-type
      div(v-for="type of merchantList" :key="type.code")
        h3(:class="type.code") {{ type.label }}
        .merchant-list
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
  padding-bottom: 12px;
  width: 270px;
  text-align: left;
}

.line {
  width: 500px;
  border-bottom: 2px solid $active;
}

.title {
  display: flex;
  justify-content: space-between;
  font-size: 24px;
}

.subtitle {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}

body {
  margin-top: 24px;
  display: flex;
}

.chart {
  display: inline-block;
  width: 55%;
  min-width: 860px;
}

.merchant {
  margin-left: 56px;
  display: inline-block;
  padding: 0 36px 12px 36px;
  width: 40%;
  min-width: 630px;
  h3 {
    margin-bottom: 24px;
  }
}

.merchant-type {
  display: flex;
  justify-content: space-between;
  & > * {
    width: 40%;
  }
}
.merchant-list {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 332px;
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
