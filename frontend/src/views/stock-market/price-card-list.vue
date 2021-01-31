<template lang="pug">
.price-card-list
  section(v-if="data.length")
    .card-item(v-for="item of data" :key="item.id")
      .title
        .name {{ item.name }}
        .id {{ item.id }}
      .price(:class="item.isUp ? 'up' : 'down'")
        .close {{ item.price }}
        .variation {{ item.change }} ( {{ item.changePercent }} )

</template>

<script>
export default {
  name: 'price-card-list',

  props: {
    data: {
      type: Array,
      required: true,
    },
  },

  setup () {
  },
}
</script>

<style lang="scss" scoped>
.price-card-list {
  width: 100%;
}

section {
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
}

.card-item {
  padding: 8px 16px;
  width: 260px;
  height: 76px;
  display: flex;
  justify-content: space-between;
  background-color: $active-background;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}

.title {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

}

.price {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: right;
}

.close,
.name {
  font-size: 18px;
}

.id,
.variation {
  opacity: .8;
}

.up {
  color: $up !important;
}

.down {
  color: $down !important;
}
</style>
