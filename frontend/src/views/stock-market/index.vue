<template lang="pug">
.stock-market(v-loading="isLoading")
  //- .area
    .tip {{ twHotList.date }}
    .headline
      awesome-icon(class="mr-2" :icon="['fas', 'chart-line']")
      h3.title 綜合指數
    .content
      price-card-list(:data="twHotList")

  //- .area
    .headline
      awesome-icon(class="mr-2" :icon="['fas', 'money-bill-wave']")
      h3.title 臺股熱門ETF
    .content
      price-card-list(:data="twHotList")

  area-theme(icon="fire-alt" title="臺股成交排行")
    template(#content)
      price-card-list(:data="twHotList")

  div(class="flex justify-between")
    area-theme(icon="balance-scale" title="臺股市值" class="w-48%")
      template(#content)
        price-table(:data="twMarketValueList" :columns="columns" height="604px")

    area-theme(icon="balance-scale" title="美股大型" class="w-48%")
      template(#content)
        price-table(:data="usMarketValueList" :columns="columns" height="604px")

</template>

<script>
import { ref } from 'vue'
import { getTwETFService, getTwHotService, getTwMarketValueService, getUsMarketValueService } from '@/api/stock-market'
import { useLoading } from '@/use/loading'
import AreaTheme from '@/components/area-theme'
import PriceCardList from './price-card-list'
import PriceTable from '@/components/price-table'

export default {
  name: 'stock-market',

  components: {
    AreaTheme,
    PriceCardList,
    PriceTable,
  },

  setup () {
    const loader = useLoading()

    const columns = [
      { label: '名稱', prop: 'name', class: () => 'name' },
      { label: '價格', prop: 'price', icon: true, class: (value) => value ? 'text-up' : 'text-down' },
      { label: '漲跌幅', prop: 'change', icon: true, class: (value) => value ? 'text-up' : 'text-down' },
      { label: '漲跌幅百分比', prop: 'changePercent', icon: true, class: (value) => value ? 'text-up' : 'text-down' },
      { label: '最低價', prop: 'low', class: () => 'text-down' },
      { label: '最高價', prop: 'high', class: () => 'text-up' },
    ]

    // index
    const twETFList = ref([])
    const getTwETFList = async () => {
      loader.load()
      twETFList.value = await getTwETFService()
      loader.unload()
    }
    getTwETFList()

    // tw etf
    // tw hot
    const twHotList = ref([])
    const getTwHotList = async () => {
      loader.load()
      twHotList.value = await getTwHotService()
      loader.unload()
    }
    getTwHotList()

    // tw marketValue
    const twMarketValueList = ref([])
    const getTwWeight = async () => {
      loader.load()
      twMarketValueList.value = await getTwMarketValueService()
      loader.unload()
    }
    getTwWeight()

    // us marketValue
    const usMarketValueList = ref([])
    const getUsHotList = async () => {
      loader.load()
      usMarketValueList.value = await getUsMarketValueService()
      loader.unload()
    }
    getUsHotList()

    return {
      isLoading: loader.isLoading,
      columns,

      twHotList,
      twMarketValueList,
      usMarketValueList,
    }
  },
}
</script>
