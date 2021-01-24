<template lang="pug">
.aside-menu
  .title(@click="returnHomePage")
    span Finance
    span Analysis

  .name
    h3 Chris Lin

  .menu
    router-link.menu-item(
      v-for="item of menuList"
      :key="item.name"
      :to="item.path"
      :class="{ 'active' : activePage === item.path }"
    )
      awesome-icon.icon(:icon="item.icon")
      span {{ item.name }}

  .links
    a.link-item(v-for="link of linkList" :key="link.code" :href="link.href" target="_blank")
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
  display: flex;
  flex-direction: column;
  width: 244px;
  height: 100vh;
  z-index: 2;
  text-align: center;
  background-color: $active-background;
  box-shadow: 0 0 8px 0 #333;
}

.title {
  width: 244px;
  line-height: 64px;
  font-size: 24px;
  font-weight: bold;
  background-color: $primary-background;
  user-select: none;
  cursor: pointer;
  z-index: 10;
  transition: all .4s;

  & > span:first-child {
    display: inline;
    color: $active;
  }

  &:hover {
    font-size: 25px;
  }

  &:active {
    transform: translateY(-4px);
  }
}

.name {
  height: 50px;
  line-height: 50px;
  background-color: $active;
}

.menu {
  height: 100%;
  overflow: auto;
}

.menu-item {
  padding-left: 36px;
  display: flex;
  align-items: center;
  height: 56px;
  color: #fff;
  font-weight: 600;
  border-bottom: 1px solid #666;
  transition: all .4s;

  .icon {
    margin-right: 24px;
  }

  &:hover {
    transform: translateY(-4px);
  }
}

.active {
  color: $active-color;
}

.links {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 56px;
  border-top: 1px solid #666;
}

.link-item {
  font-size: 24px;
  color: #fff;
}
</style>
