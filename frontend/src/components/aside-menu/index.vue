<template lang="pug">
.aside-menu
  .name
    h3 Chris Lin
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
    const menuList = [
      { name: '股市', path: 'stock-market', icon: ['fas', 'landmark'] },
      { name: '外匯', path: 'currency', icon: ['fas', 'coins'] },
      { name: '虛擬貨幣', path: 'virtual', icon: ['fas', 'donate'] },
      { name: '原物料', path: 'goods', icon: ['fas', 'cubes'] },
    ]

    const activePage = ref('')
    watchEffect(() => { activePage.value = router.currentRoute.value.name })

    const linkList = [
      { code: 'facebook', icon: ['fab', 'facebook'], href: 'www.google.com' },
      { code: 'linkedin', icon: ['fab', 'linkedin'], href: 'https://www.linkedin.com/in/chris-lin-10413a1a4' },
      { code: 'instagram', icon: ['fab', 'instagram'], href: 'www.google.com' },
      { code: 'github', icon: ['fab', 'github'], href: 'https://github.com/ChrisLin1997' },
    ]

    return {
      menuList,
      activePage,

      linkList,
    }
  },
}
</script>

<style lang="scss" scoped>
.aside-menu {
  padding-top: 64px;
  position: fixed;
  left: 0;
  width: 244px;
  height: 100%;
  z-index: 1;
  background-color: $active-background;
  box-shadow: 0 0 8px 0 #333;
}

.name {
  height: 50px;
  line-height: 50px;
  background-color: $active;
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
    font-size: 20px;
  }

  &:hover {
    font-size: 18px;
  }
}

.active {
  color: $active;
}

.links {
  padding: 24px;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 48px;
  border-top: 1px solid #666;
}

.link-item {
  font-size: 24px;
  color: #fff;
}
</style>
