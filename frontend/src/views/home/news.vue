<template lang="pug">
.news
  .type-title
    awesome-icon.icon(:icon="options.icon")
    span {{ options.name }}
  main
    template(v-for="num of 5")
      transition(name="news" mode="out-in")
        .news-list(v-if="options.page === num")
          .news-item(v-for="item of options.list.slice((num - 1) * 10, num * 10)" :key="item.title")
            a.title(:href="item.url" target="_blank") {{ item.title }}
            span(v-if="item.amount !== undefined") {{ item.amount || 0 }}
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

<style lang="scss" scoped>
.news {
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 31%;
  height: 420px;
  background-color: $active-background;
}

.type-title {
  font-size: 20px;
}

main {
  position: relative;
  display: flex;
  overflow: hidden;
}

.news-list {
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 330px;
}

.news-item {
  display: flex;
  justify-content: space-between;

  .title {
    color: $dark-font;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;

    &:hover {
      color: $active;
      font-weight: bold;
      transition: all .2s;
    }
  }

  span {
    width: 24px;
  }
}

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

.news-enter-active {
  transition: transform .4s;
}
.news-leave-active {
  transition: transform .4s;
}
</style>
