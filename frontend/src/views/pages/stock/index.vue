<template lang="pug">
.stock(v-if="Object.keys(stockInfo).length !== 0")
  header
    fa-chart.chart(:options="priceChart" color="blue")
      .info
        .title
          span {{ stockInfo.name }}
          span.currency {{ stockPrice }}
        .subtitle
          span {{ stockInfo.id + stockInfo.type }}
          span -0.92 (-0.70%)
    .merchant
      .merchant-type
        .type-item(
          v-for="type of merchantType"
          :key="type.code"
          :class="{ 'active' : type.code === activeType }"
          @click="handleType(type.code)"
        ) {{ type.label }}
      .merchant-list(v-for="item of merchantList" :key="item.code")
        h3(:class="item.code") {{ item.label }}
        .merchant-item(v-for="(node, index) of stockInfo[activeType][item.code]" :key="index" :class="item.code")
          .price {{ convertPrice(node.price) }}
          .amount {{ node.amount }}

  main
    fa-chart.chart-item(
      v-for="chart of chartList"
      :key="chart.code"
      :color="chart.color"
    )
      awesome-icon(:icon="chart.icon")
      span {{ chart.label }}

  footer

</template>

<script>
import { ref, computed, watchEffect } from 'vue'
import router from '@/router'
import FaChart from '@/components/fa-chart'
import {
  getTwstockInfoService,
  getTwstockMerchantService,
} from '@/api/twstock'

export default {
  name: 'stock',

  components: {
    FaChart,
  },

  setup () {
    const merchantType = [
      { label: '整股', code: 'stock' },
      { label: '零股', code: 'odd' },
    ]

    const merchantList = [
      { label: '委買', code: 'buy' },
      { label: '委賣', code: 'sell' },
    ]

    // 顯示交易種類
    const activeType = ref('stock')
    const handleType = (type) => {
      activeType.value = type
    }

    // 取得股票資訊
    const stockNo = ref(router.currentRoute.value.params.stockNo)
    const stockInfo = ref({})
    const stockPrice = computed(() => stockInfo.value.price[stockInfo.value.price.length - 1])
    const priceChart = ref(null)
    watchEffect(()=> {
      priceChart.value = {
      type: 'line',
      data: {
        labels: stockInfo.value.date,
        datasets: [
          {
            label: '股價',
            data: stockInfo.value.price,
            borderColor: '#3ca9c0',
            borderWidth: 2,
            pointRadius: 0,
            lineTension: 0,
          },
        ],
      },
      options: {
        layout: {
          padding: { top: 16, bottom: 8 },
        },
        legend: {
          display: false,
        },
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            gridLines: { display: false },
            ticks: { display: false },
          }],
          yAxes: [{
            position: 'right',
            gridLines: { color: '#44475a' },
            ticks: { padding: 8, fontColor: 'white' },
          }],
        },

        tooltips: {
          mode: 'index',
          enabled: true,
          intersect: false,
          displayColors: false,
          cornerRadius: 0,
          caretSize: 0,
          xPadding: 16,
          yPadding: 8,
          custom: (element) => {
            element.x = 8
            element.y = 8
          },
        },
      },
    }})

    const getTwstockInfo = async () => {
      if (stockNo.value === '') return
      const submitData = {
        stockNo: stockNo.value,
      }
      const result = await Promise.allSettled([
        getTwstockInfoService(submitData),
        getTwstockMerchantService(submitData),
      ])
      stockInfo.value = result.reduce((acc, curr) => Object.assign(acc, curr.value), {})
    }

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

    // util
    const convertPrice = (value) => {
      return Number(value).toFixed(2)
    }

    getTwstockInfo()

    return {
      merchantType,
      merchantList,

      activeType,
      handleType,

      stockInfo,
      stockPrice,
      priceChart,

      chartList,

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
  width: 280px;

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
