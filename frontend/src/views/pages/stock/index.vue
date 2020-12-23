<template lang="pug">
.stock
  price-chart(:dateList="stockHistory.date" :priceList="stockHistory.price")

</template>

<script>
import { ref, reactive } from 'vue'
import router from '@/router'
import { getTwstockHistoryService } from '@/api/twstock'
import PriceChart from '@/components/price-chart'

export default {
  name: 'stock',

  components: {
    PriceChart,
  },

  setup () {
    const stockNo = ref(router.currentRoute.value.params.stockNo)
    const stockHistory = reactive({
      date: [],
      price: [],
    })
    const getTwstockHistory = async () => {
      if (stockNo.value === '') return
      const result = await getTwstockHistoryService({ stockNo: stockNo.value })
      stockHistory.date = result.date
      stockHistory.price = result.price
    }
    getTwstockHistory()

    return {
      stockHistory,
    }
  },
}
</script>

<style>

</style>
