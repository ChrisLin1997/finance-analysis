<template lang="pug">
.goods
  .area
    awesome-icon.icon(:icon="['fas', 'cubes']")
    h3.title 原物料
    .content
      price-table(:data="tableData.data" :columns="columns" height="820px")
</template>

<script>
import { useTable } from './goods'
import PriceTable from '@/components/price-table'

export default {
  name: 'goods',

  components: {
    PriceTable,
  },

  setup () {
    const { tableData, columns, getGoodsIndex } = useTable()
    getGoodsIndex()

    return {
      tableData,
      columns,
      getGoodsIndex,
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
