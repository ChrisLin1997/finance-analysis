<template lang="pug">
.stock
  header
    .info
      .title
        span {{ stockInfo.name }}
        span {{ stockPrice }}
      .subtitle
        span {{ stockInfo.id + stockInfo.type }}
        span -0.92 (-0.70%)

    .chart(v-if="true")
      price-chart(:dateList="stockInfo.date" :priceList="stockInfo.price")
    .merchant
      h3 交易資訊
      .merchant-type
        .merchant-list(v-for="type of merchantList" :key="type.code")
          h3(:class="type.code") {{ type.label }}
          .merchant-item(v-for="(item, index) of stockInfo[activeMerchant][type.code]" :key="index" :class="type.code")
            .price {{ convertPrice(item.price) }}
            .amount {{ item.amount }}
  footer

</template>

<script>
import { ref, computed } from 'vue'
import router from '@/router'
import PriceChart from '@/components/price-chart'
import {
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

    // 顯示交易種類
    const activeMerchant = ref('stock')
    const handleMerchant = (type) => {
      activeMerchant.value = type
    }

    // 取得股票資訊
    const stockNo = ref(router.currentRoute.value.params.stockNo)
    const stockInfo = ref({
      id: '',
      name: '',
      type: '',
      industy: '',
      ipoTime: '',
      price: [],
      date: [],
      odd: {
        buy: [],
        sell: [],
      },
      stock: {
        buy: [],
        sell: [],
      },
    })
    const stockPrice = computed(() => stockInfo.value.price[stockInfo.value.price.length - 1])

    const getTwstockInfo = async () => {
      if (stockNo.value === '') return
      const submitData = {
        stockNo: stockNo.value,
      }

      const result = await Promise.allSettled([
        getTwstockInfoService(submitData),
        getTwstockMerchantService(submitData),
      ])

      stockInfo.value = result.reduce((acc, curr) => Object.assign(acc, curr), {})
    }

    getTwstockInfo()

    // util
    const convertPrice = (value) => {
      return Number(value).toFixed(2)
    }

    return {
      merchantList,

      activeMerchant,
      handleMerchant,

      stockInfo,
      stockPrice,

      convertPrice,
    }
  },
}
</script>

<style lang="scss" scoped>
.stock {
  margin: auto;
  width: 1264px;
}

header {
  display: flex;
  margin-top: 44px;
  position: relative;
  border-radius: 4px;
  background-color: $active-background;
}

.info {
  position: absolute;
  top: -36px;
  left: 16px;
  padding: 8px 16px;
  width: 220px;
  text-align: left;
  font-weight: bold;
  border-radius: 4px;
  background-color: $active;
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

.chart {
  width: 60%;
}

.merchant {
  padding: 12px 24px;
  width: 40%;
  height: 360px;
  background-color: #292d31;
}

.merchant-type {
  display: flex;
  justify-content: space-between;
  height: 310px;
  & > * {
    width: 45%;
  }
}
.merchant-list {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
}

.merchant-item {
  display: flex;
  justify-content: space-between;
  text-align: right;
  border-bottom: 1px solid $active-background;
  * {
    width: 30%;
  }
}

.buy {
  flex-direction: row-reverse;
  color: $up;
}

.sell {
  color: $down;
}
</style>
