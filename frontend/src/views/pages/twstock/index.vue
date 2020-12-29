<template lang="pug">
.twstock
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
    // hot stock
    const hotStockList = ref({ data: [], date: '' })
    const getHotTwstock = async () => {
      hotStockList.value = await getTwstockHotService()
    }

    // search stock info
    const stockNo = ref('')
    const getStock = () => router.push({ name: 'stock', query: { stockNo: stockNo.value } })

    // get news
    // get ptt stock

    getHotTwstock()

    return {
      hotStockList,
      getHotTwstock,

      stockNo,
      getStock,
    }
  },
}
</script>
