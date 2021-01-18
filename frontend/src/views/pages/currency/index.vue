<template lang="pug">
.currency
  .area
    .headline
      awesome-icon.icon(:icon="['fas', 'dollar-sign']")
      h3.title 外幣匯率
    .content
      button(v-for="key of Object.keys(tableData)" @click="handleActive(key)") {{  key === 'foreign' ? '外幣換台幣' : '台幣換外幣' }}
      price-table(:data="tableData[activeTable]" :columns="columns")
</template>

<script>
import PriceTable from '@/components/price-table'
import { useTable } from './currency'

export default {
  name: 'currency',

  components: {
    PriceTable,
  },

  setup () {
    const { tableData, columns, getExchangeList, activeTable, handleActive } = useTable()
    getExchangeList()

    return {
      tableData,
      columns,

      activeTable,
      handleActive,
    }
  },
}
</script>
