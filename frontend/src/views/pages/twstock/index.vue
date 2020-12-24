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
        @keyup.enter="getStock"
        @blur="handleBlur()"
      )
  template(v-if="hotStockList.data.length > 0")
  price-card-list(title="熱門個股" :data="hotStockList.data")

  h3 google news
  h3 Ptt

</template>

<script>
import { ref, nextTick } from 'vue'
import router from '@/router'
import { getTwstockHotService } from '@/api/twstock'
import PriceCardList from '@/components/price-card-list'

export default {
  name: 'twstock',

  components: {
    PriceCardList,
  },

  setup () {
    // hot stock
    const hotStockList = ref({
      data: [],
      date: '',
    })
    const getHotTwstock = async () => {
      hotStockList.value = await getTwstockHotService()
    }
    getHotTwstock()

    // get news

    // get ptt stock

    // search stock info
    const stockNo = ref('')
    const getStock = () => {
      router.push({ name: 'stock', params: { stockNo: stockNo.value } })
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
      getStock,

      isActive,
      inputElement,
      handleClick,
      handleBlur,
    }
  },
}
</script>

<style lang="scss" scoped>

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
