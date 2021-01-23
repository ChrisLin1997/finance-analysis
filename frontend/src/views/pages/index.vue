<template lang="pug">
.layout
  aside-menu
  main
    header-bar
    article
      router-view.view
      footer Copyright © Chris Lin 1.0.0
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
.layout {
  display: flex;
}

main {
  display: flex;
  flex-direction: column;
  width: calc(100vw - 244px);
  height: 100vh;
}

article {
  width: calc(100vw - 244px);
  overflow: auto;
}

footer {
  margin-top: 36px;
  padding: 8px 24px;
  font-size: 12px;
  color: #777;
}

.view {
  padding: 0px 24px;
  min-width: 1444px;
  min-height: calc(100vh - 120px);
  overflow: auto;
}
</style>
