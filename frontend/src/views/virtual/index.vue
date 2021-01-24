<template lang="pug">
.virtual
  .area
    .headline
      awesome-icon.icon(:icon="['fas', 'donate']")
      h3.title 虛擬貨幣
    .content
      price-table(:data="tableData" :columns="columns" height="600px")
</template>

<script>
import PriceTable from '@/components/price-table'
import { useTable } from './virtual'

export default {
  name: 'virtual',

  components: {
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

<style lang="scss" scoped>

</style>
