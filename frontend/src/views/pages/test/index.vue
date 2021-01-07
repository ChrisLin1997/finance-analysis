<template lang="pug">
.test
</template>

<script>
import { test } from '@/api/xhr'

export default {
  name: 'test',

  setup () {
    const getTestApi = async () => {
      const res = await test()
      console.log(res)
    }

    getTestApi()
  },
}
</script>

<style>

</style>
