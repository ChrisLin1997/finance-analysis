<template lang="pug">
.news(class="py-2 px-3 w-30% h-420px bg-activeGray")
  div(class="text-xl")
    awesome-icon.icon(:icon="options.icon")
    span {{ options.name }}
  main(v-if="options.list.length" class="my-3 relative flex overflow-hidden")
    template(v-for="num of 5")
      transition(name="news" mode="out-in")
        section(v-if="options.page === num" class="inline-flex flex-col justify-between w-full h-80")
          div(
            v-for="item of options.list.slice((num - 1) * 10, num * 10)"
            :key="item.title"
            class="flex justify-between"
          )
            a(:href="item.url" target="_blank" class="block text-dark text-sm overflow-hidden overflow-ellipsis whitespace-nowrap hover:text-activeColor") {{ item.title }}
            span(v-if="item.amount !== undefined" class="w-7") {{ item.amount || 0 }}

  .no-data(v-else class="flex justify-center items-center h-full text-dark text-lg")
    awesome-icon.icon(:icon="['fas', 'exclamation-circle']")
    span 暫無數據

  pagination(v-if="options.list.length" v-model="options.page" :page-size="5" :interval="getRandom(8000, 10000)" auto)
</template>

<script>
import Pagination from '@/components/pagination'
import { getRandom } from '@/helper'

export default {
  name: 'news',

  components: {
    Pagination,
  },

  props: {
    options: {
      type: Object,
      required: true,
    },
  },

  setup () {
    return {
      getRandom,
    }
  },

}
</script>

<style scoped>
.news-enter-from {
  transform: translateX(100%)
}

.news-enter-to {
  transform: translateX(0)
}

.news-leave-from {
  position: absolute;
  transform: translateX(0)
}

.news-leave-to {
  position: absolute;
  transform: translateX(-100%)
}

.news-enter-active,
.news-leave-active {
  transition: transform .4s;
}
</style>
