<template lang="pug">
.goods
  .area
    awesome-icon.icon(:icon="['fas', 'cubes']")
    h3.title 原物料
</template>

<script>
import { useTable } from './goods'
export default {
  name: 'goods',

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
