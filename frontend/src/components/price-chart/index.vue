<template lang="pug">
line-chart(:data="data" :options="options")
</template>

<script>

export default {
  name: 'price-chart',

  props: {
    data: {
      type: Array,
      default: () => [],
    },

    options: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
