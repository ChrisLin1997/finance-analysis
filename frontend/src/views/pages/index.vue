<template lang="pug">
header-bar
aside-menu
main
  router-view.view
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

  setup (props, context) {
  },
}
</script>

<style lang="scss" scoped>
main {
  margin-top: 52px;
  margin-left: 244px;
  width: calc(100vw -244px);
  height: 100%;
  overflow: auto;
}

.view {
  margin: 0px auto;
  padding: 44px;
  min-width: 1260px;
  height: fit-content;
  min-height: 100%;
}
</style>
