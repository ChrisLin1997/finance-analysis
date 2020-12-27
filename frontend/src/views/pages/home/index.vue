<template lang="pug">
.home
  h3 home
</template>

<script>
import { test } from '@/api/xhr'

export default {
  name: 'home',

  setup () {
    const getTwstockIncome = async () => {
      const result = await test()
      console.log(result)
    }
    getTwstockIncome()
  }
}
</script>
