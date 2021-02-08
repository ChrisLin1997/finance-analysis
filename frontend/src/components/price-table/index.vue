<template lang="pug">
.price-table(v-loading="data.length === 0" :style="style")
  .thead(class="flex text-sm text-dark leading-7 border-b border-activeGray")
    div(v-for="column of columns" :key="column.prop") {{ column.label }}

  .tbody(v-for="item of data" :key="item.id" class="flex justify-between h-14 font-bold border-b border-activeGray hover:bg-activeGray transition-colors")
    div(v-for="column of columns" :key="column.prop" )
      template(v-if="column.prop === 'name'")
        div(class="w-60 h-full flex items-center")
          img(v-if="item.avatar" class=" w-6 h-auto mx-4 " :src="require(`../../assets/png/${item.avatar}.png`)")
          div(class="h-full flex flex-col justify-around")
            div(class="text-activeColor") {{ item[column.prop] }}
            div(class="text-sm") {{ item.id }}
      template(v-else)
        awesome-icon(class="mr-2" v-if="column.icon" :icon="getIcon(item.isUp)" :class="getClass(item.isUp)")
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
    const getClass = (value) => value ? 'text-up' : 'text-down'
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
.thead {
  & > div:first-child {
    width: 288px;
  }

  div:not(:first-child) {
    width: 20%;
    text-align: right;
  }
}

.tbody {
  & > div:not(:first-child) {
    width: 20%;
    line-height: 56px;
    text-align: right;
  }
}
</style>
