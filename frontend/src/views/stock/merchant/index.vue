<template lang="pug">
.merchant(class="py-3 px-6 text-center")
  .type(class="m-auto w-2/5 flex bg-activeGray")
    button(
      v-for="type of merchantType"
      :key="type.code"
      :class="{ 'bg-activeColor' : type.code === activeMerchant }"
      class="py-1 w-1/2 h-auto leading-7 rounded select-none cursor-pointer transition-colors duration-400 focus:outline-none"
      @click="handleMerchant(type.code)"
    ) {{ type.label }}
  section(v-for="item of merchantList" :key="item.code" class="inline-flex flex-col justify-around w-1/2 h-80")
    h3(:class="item.code") {{ item.label }}
    article(v-for="(node, index) of merchantInfo[activeMerchant][item.code]" :key="index" :class="item.code" class="pb-2 flex justify-between text-right border-b border-activeGray")
      div(class="w-31%") {{ convertPrice(node.price) }}
      div(class="w-31%") {{ node.amount || '-' }}
</template>

<script>
import useMerchant from '../stock-info/merchant'
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
.buy {
  flex-direction: row-reverse;
  color: $up;
}

.sell {
  color: $down;
}
</style>
