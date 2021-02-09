<template lang="pug">
.goods
  area-theme(icon="cubes" title="原物料")
    template(#content)
      price-table(:data="tableData.data" :columns="columns" height="826px")
</template>

<script>
import { useTable } from './goods'
import AreaTheme from '@/components/area-theme'
import PriceTable from '@/components/price-table'

export default {
  name: 'goods',

  components: {
    AreaTheme,
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
