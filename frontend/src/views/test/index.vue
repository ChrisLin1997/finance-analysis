<template lang="pug">
.test
</template>

<script>
import { test } from '@/api/xhr'
import { getVirtualIndexService } from '@/api/virtual'

export default {
  name: 'test',

  setup () {
    const getTestApi = async () => {
      const res = await test()
      console.log(res)
    }
    const getNewApi = async () => {
      const res = await getVirtualIndexService()
      console.log(res)
    }

    getNewApi()
  },
}
</script>
