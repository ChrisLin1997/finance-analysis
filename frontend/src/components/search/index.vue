<template lang="pug">
.search
  awesome-icon(:icon="['fas', 'search']" @click="handleSearch" class="mr-2 cursor-pointer")
  input(v-model="search" @keypress.enter="handleSearch" class="px-2 py-1 w-48 h-8 border-none bg-activeGray")
</template>

<script>
import { ref } from 'vue'
import router from '@/router'

export default {
  name: 'search',

  setup () {
    const search = ref('')
    search.value = router.currentRoute.value.query.stockNo

    const handleSearch = () => search.value && router.push({ name: 'stock', query: { stockNo: search.value } })

    return {
      search,
      handleSearch,
    }
  },
}
</script>
