<template lang="pug">
.stock-market(v-loading="isLoading")
  .area
    .tip {{ twHotList.date }}
    .headline
      awesome-icon.icon(:icon="['fas', 'chart-line']")
      h3.title 綜合指數
    .content
      price-card-list(:data="twHotList.data")

  .area
    .headline
      awesome-icon.icon(:icon="['fas', 'money-bill-wave']")
      h3.title 臺股熱門ETF
    .content
      price-card-list(:data="twHotList.data")

  .area
    .headline
      awesome-icon.icon(:icon="['fas', 'fire-alt']")
      h3.title 臺股成交排行
    .content
      price-card-list(:data="twHotList.data")

  .stock-area
    .area
      .headline
        awesome-icon.icon(:icon="['fas', 'balance-scale']")
        h3.title 臺股市值
      .content
        price-table(:data="twWeightList" :columns="columns")

    .area
      .headline
        awesome-icon.icon(:icon="['fas', 'balance-scale']")
        h3.title 美股市值
      .content
        price-table(:data="usHotList" :columns="columns")

</template>

<script>
import { ref } from 'vue'
import { getTwHotService, getTwWeightService, getUsHotService } from '@/api/stock-market'
import { useLoading } from '@/use/loading'
import PriceCardList from './price-card-list'
import PriceTable from '@/components/price-table'

export default {
  name: 'stock-market',

  components: {
    PriceCardList,
    PriceTable,
  },

  setup () {
    const loader = useLoading()

    const columns = [
      { label: '名稱', prop: 'name', class: () => 'name' },
      { label: '價格', prop: 'price', icon: true, class: (value) => value ? 'up' : 'down' },
      { label: '漲跌幅', prop: 'change', icon: true, class: (value) => value ? 'up' : 'down' },
      { label: '漲跌幅百分比', prop: 'changePercent', icon: true, class: (value) => value ? 'up' : 'down' },
      { label: '最低價', prop: 'low', class: () => 'down' },
      { label: '最高價', prop: 'high', class: () => 'up' },
    ]

    // hot stock
    const twHotList = ref({ data: [], date: '' })
    const getTwHotList = async () => {
      loader.load()
      twHotList.value = await getTwHotService()
      loader.unload()
    }
    getTwHotList()

    // twse wight
    const twWeightList = ref([])
    const getTwWeight = async () => {
      loader.load()
      twWeightList.value = await getTwWeightService()
      loader.unload()
    }
    getTwWeight()
    // us hot
    const usHotList = ref([])
    const getUsHotList = async () => {
      loader.load()
      usHotList.value = await getUsHotService()
      loader.unload()
    }
    getUsHotList()

    return {
      isLoading: loader.isLoading,
      columns,

      twHotList,
      twWeightList,
      usHotList,
    }
  },
}
</script>

<style lang="scss" scoped>
.stock-area {
  display: flex;
  justify-content: space-between;
  .area {
    width: 48%;
  }
}

.tip {
  text-align: right;
}
</style>
