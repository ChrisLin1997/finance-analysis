<template lang="pug">
.major-index
  .index-list
    .index-item
      div 指數
      div 股價
      div 漲跌幅
      div 漲跌幅百分比
      div 最低價
      div 最高價
    .index-item(v-for="item of majorIndexList" :key="item.id")
      div
        span {{ item.name }}
        span {{ item.id }}
      div(:class="getClass(item.isUp)") {{ item.price }}
      div(:class="getClass(item.isUp)") {{ item.change }}
      div(:class="getClass(item.isUp)") {{ item.changePercent }}
      div.down {{ item.low }}
      div.up {{ item.high }}
</template>

<script>
import { getMajorIndexService } from '@/api/info'
import { ref } from 'vue'

export default {
  name: 'major-index',

  setup () {
    const getClass = (value) => {
      return value ? 'up' : 'down'
    }

    const majorIndexList = ref([])
    const getMajorIndex = async () => {
      majorIndexList.value = await getMajorIndexService()
    }
    getMajorIndex()

    return {
      getClass,
      majorIndexList,
    }
  },
}
</script>

<style lang="scss" scoped>
.major-index {
  margin: 44px 0;
  background-color: $active-background;
}

.index-list {
  padding: 0 12px;

  & > .index-item:first-child {
    height: 44px;
    color: $dark-font;
    font-weight: normal;
  }
}

.index-item {
  display: flex;
  justify-content: space-between;
  height: 52px;
  font-weight: bold;
  border-bottom: 1px solid #555;

  div:first-child {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 256px;
    text-align: left;
    font-size: 16px;

    span:first-child {
      color: $active;
    }

    span:nth-child(2) {
      font-size: 14px;
    }
  }

  div:not(:first-child) {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 20%;
    text-align: right;
  }
}

.up {
  color: $up;
}

.down {
  color: $down;
}
</style>
