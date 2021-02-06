<template lang="pug">
.pagination(class="flex justify-center w-full")
  span(
    v-for="num of pageSize"
    :class="{ 'text-activeColor font-bold' : modelValue === num}"
    class="mx-1 pt-2 px-1 cursor-pointer transition-colors duration-200"
    @click="handlePage(num)"
    @mouseover="stopInterval(num)"
    @mouseleave="startInterval()"
  ) {{ num }}
</template>

<script>
import { onBeforeUnmount } from 'vue'
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
      page && context.emit('update:modelValue', page)
      clearInterval(timer)
    }
    const handlePage = (page) => { context.emit('update:modelValue', page) }

    let timer = null
    if (props.auto) getTimer()

    onBeforeUnmount(() => stopInterval())

    return {
      handlePage,
      startInterval,
      stopInterval,
    }
  },
}
</script>
