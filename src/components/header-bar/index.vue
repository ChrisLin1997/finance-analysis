<template lang="pug">
.header-bar
  .title
    span Finance
    span Analysis

  .type(v-for="type of financeTypes" :key="type.name")
    .type-item {{ type.label }}

</template>

<script>
export default {
  name: 'header-bar',

  setup () {
    const financeTypes = [
      { name: 'stock', label: '股票' },
      { name: 'currency', label: '貨幣' },
      { name: 'virtualCurrency', label: '虛擬貨幣' },
    ]

    return {
      financeTypes,
    }
  },
}
</script>

<style lang="scss" scoped>
.header-bar {
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  height: 64px;
  line-height: 64px;
  background-color: $primary-background;
  box-shadow: 0 0 8px 0 #333;
  z-index: 2;
}

.title {
  width: 284px;
  height: 100%;
  font-size: 24px;
  background-color: $background;
  & > span:first-child {
    display: inline;
    color: $active;
  }
}

.type {
  max-width: calc(100% - 284px);
  height: 100%;
  overflow: auto;
}

.type-item {
  width: 180px;
  height: 64px;
  line-height: 64px;
  background-color: $active-background;
  border-right: 2px solid #666;
}

</style>
