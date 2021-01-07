<template lang="pug">
.pagination
  span(
    v-for="num of pageSize"
    :class="{ 'active' : modelValue === num}"
    @click="handlePage(num)"
    @mouseover="stopInterval(num)"
    @mouseleave="startInterval()"
  ) {{ num }}
</template>

<script>
import { getRandom } from '@/helper'

export default {
  name: 'pagination',

  props: {
    modelValue: {
      type: Number,
      required: true,
    },

    pageSize: {
      type: Number,
      default: 0,
    },

    auto: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['update:modelValue'],

  setup (props, context) {
    const getTimer = () => {
      timer = setInterval(() => {
        context.emit('update:modelValue', props.modelValue % props.pageSize + 1)
      }, getRandom(4000, 5000))
    }
    const startInterval = () => getTimer()
    const stopInterval = (page) => {
      context.emit('update:modelValue', page)
      clearInterval(timer)
    }
    const handlePage = (page) => { context.emit('update:modelValue', page) }

    let timer = null
    if (props.auto) getTimer()

    return {
      handlePage,
      startInterval,
      stopInterval,
    }
  },
}
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: center;
  width: 100%;

  span {
    margin: 0 4px;
    padding: 2px 4px 0;
    cursor: pointer;
    transition: all .2s;
    &:hover {
      opacity: .6;
      border-bottom: 1px solid $active;
    }
  }
}

.active {
  color: $active;
  font-weight: bold;
}
</style>
