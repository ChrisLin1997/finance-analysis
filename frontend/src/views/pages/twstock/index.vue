<template lang="pug">
.twstock(v-loading="loadStatus !== 0")
  price-card-list(title="熱門個股" :data="hotStockList.data")

</template>

<script>
import { ref } from 'vue'
import { getTwstockHotService } from '@/api/twstock'
import PriceCardList from '@/components/price-card-list'

export default {
  name: 'twstock',

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
