<template lang="pug">
.major-index
  div(v-for="item of majorIndexList" :key="item.id") {{ item.id }}
</template>

<script>
import { getMajorIndexService } from '@/api/info'
import { ref } from 'vue'

export default {
  name: 'major-index',

  setup () {
    const majorIndexList = ref([])
    const getMajorIndex = async () => {
      majorIndexList.value = await getMajorIndexService()
    }
    getMajorIndex()

    return {
      majorIndexList,
    }
  },
}
</script>

<style>

</style>
