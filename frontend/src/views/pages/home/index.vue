<template lang="pug">
.home
  news

</template>

<script>
import News from './news/index'

export default {
  name: 'home',

  components: {
    News,
  },

  setup () {
    return {
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
