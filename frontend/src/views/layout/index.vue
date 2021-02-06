<template lang="pug">
.layout(class="flex")
  aside-menu
  main(class="flex flex-col w-layout h-screen")
    header-bar
    article(class="w-full overflow-auto")
      router-view(v-slot="{ Component }" class="px-6 min-w-layout min-h-layout overflow-auto")
        transition(name="view" mode="out-in")
          component(:is="Component")
      footer(class="mt-10 py-2 px-6 text-xs text-dark") Copyright © Chris Lin 1.0.0
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
.view-enter-from,
.view-leave-to {
   opacity: 0;
}

.view-leave-from,
.view-enter-to {
   opacity: 1;
}

.view-enter-active,
.view-leave-active {
  transition: opacity .2s;
}
</style>
