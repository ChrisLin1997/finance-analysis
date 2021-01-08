<template lang="pug">
.header-bar
  .title(@click="returnHomePage")
    span Finance
    span Analysis
  .content
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
  display: flex;
  position: fixed;
  top: 0;
  width: 100%;
  min-width: 1024px;
  height: 64px;
  line-height: 64px;
  z-index: 2;
}

.title {
  width: 244px;
  height: 64px;
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

.content {
  padding: 0 16px;
  display: flex;
  align-items: center;
  width: calc(100% - 244px);
  height: 52px;
  background-color: $background;
  box-shadow: 0 0 8px 2px #666;
}
</style>
