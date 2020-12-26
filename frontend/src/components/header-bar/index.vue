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
      :to="{ name: type.name }"
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
  position: fixed;
  top: 0;
  width: 100%;
  min-width: 1024px;
  height: 64px;
  line-height: 64px;
  z-index: 2;
}

.title {
  width: 244px;
  height: 64px;
  font-size: 24px;
  font-weight: bold;
  background-color: $primary-background;
  user-select: none;
  cursor: pointer;
  z-index: 10;
  transition: all .4s;

  & > span:first-child {
    display: inline;
    color: $active;
  }

  &:hover {
    font-size: 25px;
  }

  &:active {
    transform: translateY(-4px);
  }
}

.type {
  display: flex;
  width: calc(100% - 244px);
  height: 44px;
  background-color: $active-background;
  box-shadow: 0 0 8px 2px #666;
  overflow-x: scroll;
}

.type-item {
  width: 160px;
  height: 44px;
  line-height: 44px;
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
