<template lang="pug">
.home
  .headline
    awesome-icon.icon(:icon="['fas', 'paper-plane']")
    h3.title 即時新聞
  news

  .headline
    awesome-icon.icon(:icon="['fas', 'chart-line']")
    h3.title 主要指數
  price-table(:data="majorIndexList")

  br
  br
  br
  br

</template>

<script>
import PriceTable from '@/components/price-table'
import News from './news/index'
import useIndex from './major-index/index'

export default {
  name: 'home',

  components: {
    News,
    PriceTable,
  },

  setup () {
    const { majorIndexList } = useIndex()

    return {
      majorIndexList,
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
