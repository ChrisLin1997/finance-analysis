<template lang="pug">
.price-card-list
  h3(v-if="title") {{ title }}

  section(v-if="data.length")
    .card-item(v-for="item of data" :key="item.id")
      .title
        .name {{ item.name }}
        .id {{ item.id }}
      .price(:class="item.variation === '+' ? 'up' : 'down'")
        .close {{ item.close }}
        .variation
          span {{ `${item.variation} ${item.spread}` }}

</template>

<script>
export default {
  name: 'price-card-list',

  props: {
    title: {
      type: String,
    },

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
  margin: 12px 0;
  text-align: left;
}

section {
  margin-top: 12px;
  width: 100%;
  min-width: 1256px;
  display: flex;
  justify-content: space-evenly;
}

.card-item {
  margin: 8px;
  padding: 8px 16px;
  width: 200px;
  height: 76px;
  display: flex;
  justify-content: space-between;
  background-color: $active-background;
  border-radius: 8px;
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
  font-size: 22px;
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
