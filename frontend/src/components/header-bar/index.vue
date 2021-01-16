<template lang="pug">
.header-bar
  search

</template>

<script>
import router from '@/router'
import Search from '@/components/search'

export default {
  name: 'header-bar',

  components: {
    Search,
  },

  setup () {
    const returnHomePage = () => router.push('/')

    return {
      returnHomePage,
    }
  },
}
</script>

<style lang="scss" scoped>
.header-bar {
  padding: 0 24px;
  display: flex;
  min-width: 1444px;
  height: 52px;
  line-height: 52px;
  z-index: 1;
  box-shadow: 0 0 8px 2px #666;
}
</style>
