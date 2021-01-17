<template lang="pug">
.currency
  .area
    .headline
      awesome-icon.icon(:icon="['fas', 'dollar-sign']")
      h3.title 外幣匯率
    .content
</template>

<script>
import { getCurrencyExchange } from '@/api/currency'

export default {
  name: 'currency',

  setup () {
    const getExchangeList = async () => {
      const result = await getCurrencyExchange()
      console.log(result)
    }
    getExchangeList()
  },
}
</script>
