<template lang="pug">
.currency
  .area
    .headline
      awesome-icon.icon(:icon="['fas', 'dollar-sign']")
      h3.title 外幣匯率
    .content
      .switch
        div(
          v-for="key of Object.keys(tableData)"
          :class="{ 'active' : activeTable === key }"
          @click="handleActive(key)"
          ) {{  mapping[key] }}
      price-table(:data="tableData[activeTable]" :columns="columns" height="600px")
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

<style lang="scss" scoped>
.switch {
  margin: 12px 0;
  display: flex;
  width: fit-content;
  border-radius: 8px;
  background-color: $active-background;

  div {
    padding: 12px 16px;
    border-radius: 8px;
    color: $active;
    cursor: pointer;
    transition: all .4s;
  }
}

.active {
  color: #fff !important;
  background-color: $active;
}
</style>
