<template lang="pug">
.twstock
  .search(:class="{ 'isActive' : isActive }")
    .search-icon(@click="handleClick()")
      awesome-icon(:icon="['fas', 'search']")
    transition(name="input")
      input.input(
        ref="inputElement"
        v-show="isActive"
        v-model="stockNo"
        @keyup.enter="getTwstockInfo()"
        @blur="handleBlur()"
      )

  price-card-list(title="熱門個股" :data="hotStockList")

</template>

<script>
import { ref, nextTick } from 'vue'
import { getTwstockInfoService, getTwstockHotService } from '@/api/twstock'
import PriceCardList from '@/components/price-card-list'

export default {
  name: 'twstock',

  components: {
    PriceCardList,
  },

  setup () {
    // hot stock
    const hotStockList = ref([])
    const getHotTwstock = async () => {
      const result = await getTwstockHotService()
      result.slice(0, 6).forEach(item => {
        hotStockList.value.push({
          id: item[1],
          name: item[2],
          transaction: item[4],
          open: item[5],
          close: item[8],
          high: item[6],
          low: item[7],
          variation: item[9].includes('+'),
          spread: item[10],
        })
      })
    }
    getHotTwstock()

    // search stock info
    const stockNo = ref('')
    let stockInfo = {}
    const getTwstockInfo = async () => {
      if (stockNo.value === '') return
      const result = await getTwstockInfoService({ stockId: stockNo.value })
      stockInfo = result
    }

    // active
    const isActive = ref(false)
    const inputElement = ref(null)
    const handleClick = async () => {
      isActive.value = true
      await nextTick()
      if (inputElement.value) inputElement.value.focus()
    }
    const handleBlur = () => {
      if (stockNo.value !== '') return
      isActive.value = false
      stockNo.value = ''
    }

    return {
      hotStockList,
      getHotTwstock,

      stockNo,
      stockInfo,
      getTwstockInfo,

      isActive,
      inputElement,
      handleClick,
      handleBlur,
    }
  },
}
</script>

<style lang="scss" scoped>

.twstock {
  margin: 12px;
}

.search {
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  border-radius: 24px;
  background-color: transparent;
  transition: background-color .2s;
}

.isActive {
  background-color: $active-background;
}

.search-icon {
  width: 48px;
  height: 48px;
  line-height: 48px;
  font-size: 24px;
  border-radius: 100px;
  transition: all .2s;
  cursor: pointer;
  &:hover {
    background-color: $active-background;
    box-shadow: 0 0 4px 0 #aaa;
  }
}

.input {
  margin-left: 4px;
  width: 140px;
  height: 36px;
  background-color: transparent;
  border: none;
  outline: none;
}

.input-enter-from,
.input-leave-to {
  max-width: 0px;
}

.input-enter-active,
.input-leave-active {
  transition: all .2s;
}

.input-enter-to,
.input-leave-from {
  max-width: 140px;
}
</style>
