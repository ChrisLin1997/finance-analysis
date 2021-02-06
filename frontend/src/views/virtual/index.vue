<template lang="pug">
.virtual
  area-theme(icon="donate" title="加密貨幣")
    template(#content)
      price-table(:data="tableData" :columns="columns" height="600px")
</template>

<script>
import AreaTheme from '@/components/area-theme'
import PriceTable from '@/components/price-table'
import { useTable } from './virtual'

export default {
  name: 'virtual',

  components: {
    AreaTheme,
    PriceTable,
  },

  setup () {
    const { tableData, columns, getVirtualIndex } = useTable()
    getVirtualIndex()

    return {
      tableData,
      columns,
      getVirtualIndex,
    }
  },
}
</script>
