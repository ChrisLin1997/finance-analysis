<template lang="pug">
.twstock(v-loading="loadStatus !== 0")
  search(v-model="stockNo" @keyup.enter="getStock")
  price-card-list(title="熱門個股" :data="hotStockList.data")

  h3 google news
  h3 Ptt

</template>

<script>
import { ref, nextTick } from 'vue'
import router from '@/router'
import { getTwstockHotService } from '@/api/twstock'
import PriceCardList from '@/components/price-card-list'
import Search from '@/components/search'

export default {
  name: 'twstock',

  components: {
    PriceCardList,
    Search,
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

    // search stock info
    const stockNo = ref('')
    const getStock = () => router.push({ name: 'stock', query: { stockNo: stockNo.value } })

    // get news
    // get ptt stock

    getHotTwstock()

    return {
      loadStatus,

      hotStockList,
      getHotTwstock,

      stockNo,
      getStock,
    }
  },
}
</script>
