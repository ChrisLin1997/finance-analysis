<template lang="pug">
.home
  price-chart(:data="[1,2,3,3,4,5]")
</template>

<script>
import PriceChart from '@/components/price-chart'

export default {
  name: 'home',

  components: {
    PriceChart,
  },
}
</script>
