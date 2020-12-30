<template lang="pug">
.home
  h3 home

</template>

<script>
import { getTwstockIncomeService } from '@/api/twstock'
export default {
  name: 'home',

  setup () {
    getTwstockIncomeService({ stockNo: '2330' })
  }
}
</script>
