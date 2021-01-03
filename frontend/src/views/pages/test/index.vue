<template lang="pug">
.test
</template>

<script>
import { getTwstockEpsService } from '@/api/twstock'

export default {
  name: 'test',

  setup () {
    const getStockEps = async () => {
      const submitData = {
        stockNo: '1101',
      }
      const res = await getTwstockEpsService(submitData)
      console.log(res)
    }
    getStockEps()
  },
}
</script>

<style>

</style>
