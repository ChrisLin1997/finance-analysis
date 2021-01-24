<template lang="pug">
.index-list(v-loading="data.length === 0" :style="style")
  .thead-item
    div(v-for="column of columns" :key="column.prop") {{ column.label }}

  .table-item(v-for="item of data" :key="item.id")
    div(v-for="column of columns" :key="column.prop")
      template(v-if="column.prop === 'name'")
        .avatar(v-if="item.avatar")
          img(:src="require(`../../assets/png/${item.avatar}.png`)")
        .text
          span(:class="column.class ? column.class(item.isUp) : null") {{ item[column.prop] }}
          span {{ item.id }}
      template(v-else)
        awesome-icon.icon(v-if="column.icon" :icon="getIcon(item.isUp)" :class="getClass(item.isUp)")
        span(:class="column.class ? column.class(item.isUp) : null") {{ item[column.prop] }}
</template>

<script>
import { computed } from 'vue'
export default {
  name: 'price-table',

  props: {
    data: {
      type: Array,
      default: () => [],
    },

    columns: {
      type: Array,
      default: () => [],
    },

    height: {
      type: String,
    },
  },

  setup (props) {
    const getClass = (value) => value ? 'up' : 'down'
    const getIcon = (value) => value ? ['fas', 'caret-up'] : ['fas', 'caret-down']
    const style = computed(() => ({ height: props.height }))

    return {
      style,

      getClass,
      getIcon,
    }
  },

}
</script>

<style lang="scss" scoped>
.thead-item {
  display: flex;
  color: $dark-font;
  font-size: 14px;
  line-height: 28px;
  border-bottom: 1px solid #555;

  div:first-child {
    width: 280px;
  }

  div:not(:first-child) {
    width: 20%;
    text-align: right;
  }
}

.table-item {
  display: flex;
  justify-content: space-between;
  height: 56px;
  font-weight: bold;
  border-bottom: 1px solid #555;

  div:first-child {
    width: 280px;
    display: flex;
    justify-content: flex-start;

    .avatar {
      width: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .text {
      padding-left: 8px;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;

      * {
        line-height: 24px;
        text-align: left;
      }
    }
  }

  div:not(:first-child) {
    width: 20%;
    line-height: 56px;
    text-align: right;
  }

  &:hover {
    transition: all .4s;
    background-color: $active-background;
  }
}

.name {
  color: $active-color;
}

.id {
  font-size: 14px;
}

.up {
  color: $up;
}

.down {
  color: $down;
}

img {
  width: 24px;
  height: 24px;
}
</style>
