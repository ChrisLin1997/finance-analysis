<template lang="pug">
.test
</template>

<script>
import { getGoogleNewsService } from '@/api/info'

export default {
  name: 'test',

  setup () {
    const getTestApi = async () => {
      const submitData = {
        type: 'global',
      }
      const res = await getGoogleNewsService(submitData)
      console.log(res)
    }

    getTestApi()
  },
}
</script>

<style>

</style>
