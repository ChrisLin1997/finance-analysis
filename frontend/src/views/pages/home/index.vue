<template lang="pug">
.home
  h2 即時新聞
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
.home {
  text-align: left;
}
</style>
