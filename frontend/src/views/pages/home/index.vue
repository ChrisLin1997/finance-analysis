<template lang="pug">
.home
  .area
    .headline
      awesome-icon.icon(:icon="['fas', 'paper-plane']")
      h3.title 即時新聞
    .content
      .news-layout
        news(
          v-for="news of newsTypeList"
          :key="news.code"
          :options="news"
          v-loading="news.list.length === 0"
        )

  .area
    .headline
      awesome-icon.icon(:icon="['fas', 'chart-line']")
      h3.title 主要指數
    .content
      price-table(:data="majorIndexList" :columns="indexColumns" height="700px")

</template>

<script>
import PriceTable from '@/components/price-table'
import News from './news'
import { useIndex, useNews } from './home'

export default {
  name: 'home',

  components: {
    News,
    PriceTable,
  },

  setup () {
    const { majorIndexList, indexColumns, getMajorIndex } = useIndex()
    const { newsTypeList, getAllNews } = useNews()

    getMajorIndex()
    getAllNews()

    return {
      majorIndexList,
      indexColumns,

      newsTypeList,
    }
  },
}
</script>

<style lang="scss" scoped>
.news-layout {
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
}
</style>
