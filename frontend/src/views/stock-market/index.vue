<template lang="pug">
.stock-market(v-loading="loadStatus !== 0")
  .area
    .headline
      awesome-icon.icon(:icon="['fas', 'fire-alt']")
      h3.title 臺股熱門
    .content
      PriceCardList(:data="hotStockList.data")

  .area
    .headline
      awesome-icon.icon(:icon="['fas', 'fire-alt']")
      h3.title 美股熱門
    .content

</template>

<script>
import { ref } from 'vue'
import { getTwstockHotService } from '@/api/twstock'
import PriceCardList from '@/components/price-card-list'

export default {
  name: 'stock-market',

  components: {
    PriceCardList,
  },

  setup () {
    const loadStatus = ref(0)
    // hot stock
    const hotStockList = ref({ data: [], date: '' })
    const getHotTwstock = async () => {
      loadStatus.value++
      hotStockList.value = await getTwstockHotService()
      loadStatus.value--
    }
    getHotTwstock()

    return {
      loadStatus,

      hotStockList,
      getHotTwstock,
    }
  },
}
</script>
