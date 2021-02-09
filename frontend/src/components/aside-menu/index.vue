<template lang="pug">
.aside-menu(class="flex flex-col w-60 h-screen text-center bg-grayPrimary z-20")
  .title(@click="returnHomePage" class="py-4 w-full text-2xl font-bold cursor-pointer select-none transition-all duration-200 active:text-2xl hover:text-hover" )
    span(class="text-active") Finance
    span Analysis

  section(class="h-full overflow-auto border-t border-b border-graySecondary")
    router-link(
      v-for="item of menuList"
      :key="item.name"
      class="pl-9 flex items-center h-14 font-bold transition-transform duration-400 border-b border-graySecondary transform hover:-translate-y-1"
      :to="item.path"
      :class="{ ' text-active' : activePage === item.path }"
    )
      awesome-icon(class="mr-4" :icon="item.icon")
      span {{ item.name }}

  footer(class="flex justify-evenly items-center w-full h-14")
    a(v-for="link of linkList" :key="link.code" :href="link.href" target="_blank" class=" text-xl")
      awesome-icon(:icon="link.icon")
</template>

<script>
import { ref, watchEffect } from 'vue'
import router from '@/router'

export default {
  name: 'aside-menu',

  setup () {
    const returnHomePage = () => router.push({ name: 'home' })

    const menuList = [
      { name: '股市', path: 'stock-market', icon: ['fas', 'landmark'] },
      { name: '外匯', path: 'currency', icon: ['fas', 'coins'] },
      { name: '加密貨幣', path: 'virtual', icon: ['fas', 'donate'] },
      { name: '原物料', path: 'goods', icon: ['fas', 'cubes'] },
    ]

    const activePage = ref('')
    watchEffect(() => { activePage.value = router.currentRoute.value.name })

    const linkList = [
      { code: 'google', icon: ['fab', 'google'], href: 'https://www.google.com' },
      { code: 'github', icon: ['fab', 'github'], href: 'https://github.com/ChrisLin1997' },
      { code: 'linkedin', icon: ['fab', 'linkedin'], href: 'https://www.linkedin.com/in/chris-lin-10413a1a4' },
      { code: 'mail', icon: ['fas', 'envelope'], href: 'mailto:i100308326@gmail.com' },
    ]

    return {
      returnHomePage,

      menuList,
      activePage,

      linkList,
    }
  },
}
</script>

<style lang="scss" scoped>
.aside-menu {
  // box-shadow: 0 0 8px 0px #333;
}
</style>
