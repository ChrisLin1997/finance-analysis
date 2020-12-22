<template lang="pug">
.page
  header-bar
  aside-menu
  main
    router-view
</template>

<script>
import AsideMenu from '@/components/aside-menu'
import HeaderBar from '@/components/header-bar'

export default {
  name: 'layout',

  components: {
    AsideMenu,
    HeaderBar,
  },

  setup () {
  },
}
</script>

<style lang="scss" scoped>
main {
  padding: 64px 0 0 284px;
  width: 100%;
  min-width: calc(1024px - 284px);
  height: 100%;
  overflow: auto;
}
</style>
