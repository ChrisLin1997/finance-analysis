<template lang="pug">
.stock-market(v-loading="loadStatus !== 0")
  .headline
    awesome-icon.icon(:icon="['fas', 'fire-alt']")
    h3 熱門個股
  //- price-card-list(:data="hotStockList.data")

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
