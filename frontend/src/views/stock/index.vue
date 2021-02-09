<template lang="pug">
.stock
  area-theme(class="mt-12")
    template(#content)
      article(class="flex justify-around h-96")
        fa-chart(:options="priceChartOption" color="blue" class="w-48%")
          article(class="w-fit")
            div(class="my-1")
              span {{ stockInfo.name }}
              span(class="ml-12") {{ stockInfo.price }}
              span(class="mt-2 ml-1 text-xs") {{ stockInfo.currency }}
            div(class="flex justify-between text-sm")
              span {{ stockInfo.id }}
              span {{ stockInfo.change }} ({{ stockInfo.changePercent }})

        merchant(:stockNo="userSearch" class="w-48%")

  area-theme(class="mt-12")
    template(#content)
      article(class="flex justify-around h-80")
        fa-chart(
          v-for="chart of chartList"
          :key="chart.code"
          class="w-48%"
          :color="chart.color"
          :options="chart.option"
        )
          awesome-icon(:icon="chart.icon" class="mr-2 ")
          span {{ chart.label }}

</template>

<script>
import { ref, watchEffect } from 'vue'
import router from '@/router'
import AreaTheme from '@/components/area-theme'
import FaChart from '@/components/fa-chart'
import useStock from './stock-info'
import Merchant from './merchant/index'

export default {
  name: 'stock',

  components: {
    AreaTheme,
    FaChart,
    Merchant,
  },

  setup () {
    // search
    const userSearch = ref('')
    // 報表
    const { priceChartOption, chartList, getAllInfo, stockInfo } = useStock(userSearch)

    watchEffect(() => {
      userSearch.value = router.currentRoute.value.query.stockNo
      if (userSearch.value) getAllInfo()
    })

    return {
      userSearch,

      stockInfo,

      priceChartOption,
      chartList,
    }
  },
}
</script>
