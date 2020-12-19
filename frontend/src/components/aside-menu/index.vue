<template lang="pug">
.aside-menu
  .name
    h3 Chris Lin
  //- router-link.menu-item(
  //-   v-for="item of menuList"
  //-   :key="item.name"
  //-   :to="item.path"
  //- ) {{ item.name }}
</template>

<script>
export default {
  name: 'aside-menu',

  setup () {
    const menuList = [
      { name: 'Trading', path: 'trading' },
      { name: 'Paid membership', path: 'paid' },
      { name: 'Account management', path: 'management' },
      { name: 'History', path: 'history' },
      { name: 'News', path: 'news' },
      { name: 'Trading', path: 'Trading' },
    ]

    return {
      menuList,
    }
  },
}
</script>

<style lang="scss" scoped>
.aside-menu {
  padding-top: 64px;
  position: fixed;
  left: 0;
  width: 284px;
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
  display: flex;
  justify-content: center;
  align-items: center;
  height: 56px;
  border-bottom: 1px solid #666;
}
</style>
