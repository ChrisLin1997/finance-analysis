<template lang="pug">
.home
  news
  major-index

</template>

<script>
import News from './news/index'
import MajorIndex from './major-index'

export default {
  name: 'home',

  components: {
    News,
    MajorIndex,
  },

  setup () {
    return {
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
