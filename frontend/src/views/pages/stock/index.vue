<template lang="pug">
.stock
  Search
  template(v-if="stockInfo.status")
    header
      fa-chart.chart(:options="priceChart" color="blue")
        .info
          .title
            span {{ stockInfo.name }}
            span.currency {{ stockInfo.currencyPrice }}
          .subtitle
            span {{ stockInfo.id }}
            span {{ stockInfo.variation }} ({{ stockInfo.percent }}%)
      .merchant
        .merchant-type
          .type-item(
            v-for="type of merchantType"
            :key="type.code"
            :class="{ 'active' : type.code === activeMerchant }"
            @click="handleMerchant(type.code)"
          ) {{ type.label }}
        .merchant-list(v-for="item of merchantList" :key="item.code")
          h3(:class="item.code") {{ item.label }}
          .merchant-item(v-for="(node, index) of stockInfo[activeMerchant][item.code]" :key="index" :class="item.code")
            .price {{ convertPrice(node.price) }}
            .amount {{ node.amount || '-' }}

    main
      fa-chart.chart-item(
        v-for="chart of chartList"
        :key="chart.code"
        :color="chart.color"
      )
        awesome-icon(:icon="chart.icon")
        span {{ chart.label }}

  template(v-else)
    h3 查無資料！  

</template>

<script>
import router from '@/router'
import Search from '@/components/search'
import FaChart from '@/components/fa-chart'
import searchStockInfo from './stock'
import stockPriceChart from './priceChart'
import viewMerchant from './merchant'


export default {
  name: 'stock',

  components: {
    Search,
    FaChart,
  },

  setup () {
    // chart
    const chartList = [
      {
        code: 'income',
        label: '營收',
        icon: ['fas', 'coins'],
        color: 'green',
      },
      {
        code: 'profit',
        label: '利潤',
        icon: ['fas', 'chart-line'],
        color: 'red',
      },
      {
        code: 'eps',
        label: 'EPS',
        icon: ['fas', 'chart-bar'],
        color: 'yellow',
      },
    ]

    // 顯示交易類型
    const { merchantType, merchantList, activeMerchant, handleMerchant } = viewMerchant()

    // 取得股票資訊
    const { stockInfo, getTwstockInfo } = searchStockInfo(router.currentRoute.value.params.stockNo)
    getTwstockInfo()

    // 價格走勢
    const { priceChart } = stockPriceChart(stockInfo)

    // 工具
    const convertPrice = (value) => {
      return value ? Number(value).toFixed(2) : '-'
    }

    return {
      chartList,

      merchantType,
      merchantList,
      activeMerchant,
      handleMerchant,

      stockInfo,
      priceChart,

      convertPrice,
    }
  },
}
</script>

<style lang="scss" scoped>
// top
header {
  display: flex;
  margin-top: 44px;
  position: relative;
  border-radius: 4px;
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

.merchant {
  padding: 12px 24px;
  width: 40%;
  background-color: #292d31;
}

.merchant-type {
  margin: 0 auto;
  display: flex;
  width: 40%;
  background-color: $active-background;

  .type-item {
    width: 50%;
    height: 30px;
    line-height: 30px;
    border-radius: 4px;
    transition: all .2s;
    cursor: pointer;
    user-select: none;

    &:hover {
      background-color: #666;
    }
  }

  .active {
    background-color: $active;
  }
}

.merchant-list {
  display: inline-flex;
  flex-direction: column;
  justify-content: space-around;
  width: 50%;
  height: 310px;
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

.currency {
  margin-left: 24px;
  &:after {
    content: ' NTD';
    font-size: 8px;
  }
}

.buy {
  flex-direction: row-reverse;
  color: $up;
}

.sell {
  color: $down;
}

// center
main {
  margin-top: 48px;
  display: flex;
  justify-content: space-between;

  .chart-item {
    width: 32%;
  }
}
</style>
