<template lang="pug">
.home
  area-theme(icon="paper-plane" title="即時新聞")
    template(#content)
      article(class="mt-3 flex justify-between")
        news(
          v-for="news of newsTypeList"
          :key="news.code"
          :options="news"
          v-loading="news.isLoading"
        )
  area-theme(icon="chart-line" title="主要指數")
    template(#content)
      price-table(:data="majorIndexList" :columns="columns" height="760px")

</template>

<script>
import AreaTheme from '@/components/area-theme'
import PriceTable from '@/components/price-table'
import News from './news'
import { useIndex, useNews } from './home'

export default {
  name: 'home',

  components: {
    AreaTheme,
    News,
    PriceTable,
  },

  setup () {
    const { majorIndexList, columns, getMajorIndex } = useIndex()
    const { newsTypeList, getAllNews } = useNews()

    getMajorIndex()
    getAllNews()

    return {
      majorIndexList,
      columns,

      newsTypeList,
    }
  },
}
</script>
