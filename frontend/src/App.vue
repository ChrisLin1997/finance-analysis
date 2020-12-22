<template lang="pug">
.layout
  router-view
</template>

<script>

export default {
  name: 'App',
}
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  min-width: 1024px;
  height: 100vh;
  color: #fff;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: $background;
}

</style>

<style lang="scss">
@import '@/assets/index.scss';
</style>
