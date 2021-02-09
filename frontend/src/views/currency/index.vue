<template lang="pug">
.currency
  area-theme(icon="dollar-sign" title="外幣匯率")
    template(#content)
      section(class=" my-3 flex w-fit rounded bg-grayPrimary")
        div(
          v-for="key of Object.keys(tableData)"
          :class="{ 'active bg-active' : activeTable === key }"
          class=" px-2 py-1 text-active rounded cursor-pointer transition-colors duration-400"
          @click="handleActive(key)"
          ) {{  mapping[key] }}
      price-table(:data="tableData[activeTable]" :columns="columns" height="604px")
</template>

<script>
import AreaTheme from '@/components/area-theme'
import PriceTable from '@/components/price-table'
import { useTable } from './currency'

export default {
  name: 'currency',

  components: {
    AreaTheme,
    PriceTable,
  },

  setup () {
    const mapping = {
      foreign: '外幣 ➜ 新台幣',
      local: '新台幣 ➜ 外幣',
    }
    const { tableData, columns, getCurrencyIndex, activeTable, handleActive } = useTable()
    getCurrencyIndex()

    return {
      mapping,

      tableData,
      columns,

      activeTable,
      handleActive,
    }
  },
}
</script>

<style scoped>
.active {
  color: #fff !important;
}
</style>
