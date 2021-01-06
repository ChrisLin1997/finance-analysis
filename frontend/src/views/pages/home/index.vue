<template lang="pug">
.home
  .news
    .news-type(v-for="type of newsTypeList" :key="type.code")
      h3 {{ type.name }}
      .news-item(v-for="item of type.list" :key="item.id")
        .title {{ item.title }}
        a.href(:href="item.href" target="_blank")
      pagination(v-if="type.list.length" v-model="type.page" :page-size="5" :interval="getRandom(3000, 4000)" auto)

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

.news-item {
  position: relative;
  color: #d5d5d5;

  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
    font-size: 14px;
  }

  .href {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    &:hover {
      border-bottom: .5px solid #d5d5d5;
    }
  }
}
</style>
