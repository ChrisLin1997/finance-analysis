<template lang="pug">
.home
  price-chart
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
