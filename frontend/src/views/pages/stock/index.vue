<template lang="pug">
.stock
  .search(:class="{ 'isActive' : isActive }")
    .search-icon(@click="handleClick")
      awesome-icon(:icon="['fas', 'search']")
    transition(name="input")
      input.input(
        ref="inputElement"
        v-show="isActive"
        v-model="stockId"
        @keyup.enter="getStockInfo"
        @blur="handleBlur"
      )

  .index-list

</template>

<script>
import { ref, nextTick, reactive, toRef } from 'vue'
import { getStockInfoService } from '@/api/stock'

export default {
  name: 'stock',

  setup () {
    const stockId = ref('')

    // getStock
    let stockInfo = {}
    const getStockInfo = async () => {
      if (stockId.value === '') return
      const result = await getStockInfoService({ stockId: stockId.value })
      stockInfo = reactive({ ...result })
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
      isActive.value = false
    }

    return {
      stockId,

      stockInfo,
      getStockInfo,

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
  margin: 12px;
  padding-right: 12px;
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
