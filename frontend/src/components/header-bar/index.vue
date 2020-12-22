<template lang="pug">
.header-bar
  .title(@click="returnHomePage")
    span Finance
    span Analysis

  .type
    router-link.type-item(
      v-for="type of financeTypes"
      :key="type.name"
      :class="{ 'active' : activeType === type.name }"
      :to="type.name"
    ) {{ type.label }}

</template>

<script>
import { computed } from 'vue'
import router from '@/router'

export default {
  name: 'header-bar',

  setup () {
    const financeTypes = [
      { name: 'twstock', label: '臺股' },
      { name: 'usstock', label: '美股' },
      { name: 'currency', label: '貨幣' },
      { name: 'virtualCurrency', label: '虛擬貨幣' },
      { name: 'goods', label: '商品' },
    ]

    const returnHomePage = () => router.push('/')

    // active
    const activeType = computed(() => router.currentRoute.value.name)

    return {
      financeTypes,
      returnHomePage,

      activeType,
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
  min-width: 1024px;
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
  user-select: none;
  cursor: pointer;
  transition: all .4s;

  & > span:first-child {
    display: inline;
    color: $active;
  }

  &:hover {
    background-color: #20202d;
  }

  &:active {
    position: relative;
    top: -1px;
  }
}

.type {
  display: flex;
  width: calc(100vw - 284px);
  height: 100%;
  overflow-x: scroll;
}

.type-item {
  width: 180px;
  min-width: 180px;
  height: 64px;
  line-height: 64px;
  color: #fff;
  background-color: $active-background;
  border-right: 2px solid #666;
  cursor: pointer;
  user-select: none;
  transition: all .2s;
}

.active {
  font-size: 18px;
  font-weight: bold;
  color: $active;
}

</style>
