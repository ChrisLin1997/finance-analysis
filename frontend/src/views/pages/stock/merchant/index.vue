<template lang="pug">
.merchant
  .merchant-type
    .type-item(
      v-for="type of merchantType"
      :key="type.code"
      :class="{ 'active' : type.code === activeMerchant }"
      @click="handleMerchant(type.code)"
    ) {{ type.label }}
  .merchant-list(v-for="item of merchantList" :key="item.code")
    h3(:class="item.code") {{ item.label }}
    .merchant-item(v-for="(node, index) of merchantInfo[activeMerchant][item.code]" :key="index" :class="item.code")
      .price {{ convertPrice(node.price) }}
      .amount {{ node.amount || '-' }}
</template>

<script>
import useMerchant from './merchant'
import { watchEffect } from 'vue'

const merchantType = [
  { label: '整股', code: 'stock' },
  { label: '零股', code: 'odd' },
]

const merchantList = [
  { label: '委買', code: 'buy' },
  { label: '委賣', code: 'sell' },
]

const convertPrice = (value) => {
  return value ? Number(value).toFixed(2) : '-'
}

export default {
  name: 'merchant',

  props: {
    stockNo: {
      type: String,
      required: true,
    },
  },

  setup (props) {
    const { activeMerchant, handleMerchant, merchantInfo, getMerchatInfo } = useMerchant()

    watchEffect(() => { getMerchatInfo(props.stockNo) })

    return {
      merchantType,
      merchantList,

      activeMerchant,
      handleMerchant,

      merchantInfo,

      convertPrice,
    }
  },
}
</script>

<style lang="scss" scoped>
.merchant {
  padding: 12px 24px;
  width: 40%;
  background-color: #292d31;
}

.merchant-type {
  margin: 0 auto;
  display: flex;
  width: 40%;
  background-color: $active-background;

  .type-item {
    width: 50%;
    height: 30px;
    line-height: 30px;
    border-radius: 4px;
    transition: all .2s;
    cursor: pointer;
    user-select: none;

    &:hover {
      background-color: #666;
    }
  }

  .active {
    background-color: $active;
  }
}

.merchant-list {
  display: inline-flex;
  flex-direction: column;
  justify-content: space-around;
  width: 50%;
  height: 310px;
}

.merchant-item {
  display: flex;
  justify-content: space-between;
  text-align: right;
  border-bottom: 1px solid $active-background;
  * {
    width: 30%;
  }
}

.buy {
  flex-direction: row-reverse;
  color: $up;
}

.sell {
  color: $down;
}
</style>
