<template lang="pug">
.index-layout
  .index-list(v-loading="data.length === 0")
    .index-item
      div 名稱
      div 價格
      div 漲跌幅
      div 漲跌幅百分比
      div 當日最低價
      div 當日最高價
    .index-item(v-for="item of data" :key="item.id")
      div
        span {{ item.name }}
        span {{ item.id }}
      div(:class="getClass(item.isUp)") {{ item.price }}
      div(:class="getClass(item.isUp)")
        awesome-icon.icon(:icon="getIcon(item.isUp)")
        span {{ item.change }}
      div(:class="getClass(item.isUp)")
        awesome-icon.icon(:icon="getIcon(item.isUp)")
        span {{ item.changePercent }}
      div.down {{ item.low }}
      div.up {{ item.high }}
</template>

<script>
export default {
  name: 'price-table',

  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },

  setup () {
    const getClass = (value) => value ? 'up' : 'down'
    const getIcon = (value) => value ? ['fas', 'caret-up'] : ['fas', 'caret-down']

    return {
      getClass,
      getIcon,
    }
  },

}
</script>

<style lang="scss" scoped>
.index-list {

  & > .index-item:first-child {
    height: 44px;
    color: $dark-font;
    font-size: 14px;
    font-weight: normal;

    &:hover {
      background-color: none;
    }
  }
}

.index-item {
  display: flex;
  justify-content: space-between;
  height: 56px;
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

  &:hover {
    transition: all .4s;
    background-color: $active-background;
  }
}

.up {
  color: $up;
}

.down {
  color: $down;
}
</style>
