<template lang="pug">
.home
  .news
    .news-type(v-for="type of newsTypeList" :key="type.code")
      h3 {{ type.name }}
      .center
        template(v-for="num of 5")
          transition(name="news" mode="out-in")
            .news-list(v-if="type.page === num")
              .news-item(v-for="item of type.list.slice((num - 1) * 10, num * 10)" :key="item.id")
                a.title(:href="item.href" target="_blank") {{ item.title }}
                span {{ item.amount }}
      pagination(v-if="type.list.length" v-model="type.page" :page-size="5" :interval="getRandom(8000, 10000)" auto)

</template>

<script>
import useNews from './news'
import Pagination from '@/components/pagination'
import { getRandom } from '@/helper'

export default {
  name: 'home',

  components: {
    Pagination,
  },

  setup () {
    const { newsTypeList } = useNews()

    return {
      newsTypeList,

      getRandom,
    }
  },
}
</script>

<style lang="scss" scoped>
.news {
  display: flex;
  justify-content: space-between;
}

.news-type {
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 31%;
  height: 420px;
  background-color: $active-background;
}

.center {
  position: relative;
  display: flex;
  margin: 8px 0;
  width: 100%;
  height: 330px;
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
    color: #d5d5d5;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
    font-size: 14px;

    &:hover {
      color: $active;
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
