<template lang="pug">
.search
  awesome-icon(class="mr-2 cursor-pointer" :icon="['fas', 'search']" @click="handleEnter")
  input(v-model="search" @keypress.enter="handleEnter")
</template>

<script>
import { ref } from 'vue'
import router from '@/router'

export default {
  name: 'search',

  setup () {
    const search = ref('')
    search.value = router.currentRoute.value.query.stockNo

    const handleEnter = () => {
      router.push({ name: 'stock', query: { stockNo: search.value } })
    }

    return {
      search,
      handleEnter,
    }
  },
}
</script>

<style lang="scss" scoped>
.icon {
  cursor: pointer;
}

input {
  padding: 4px 8px;
  width: 200px;
  height: 32px;
  color: #fff;
  background-color: $active-background;
  border: none;
  outline: none;
}
</style>
