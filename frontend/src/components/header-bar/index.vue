<template lang="pug">
.header-bar(class="flex px-6 py-2 w-full h-12 leading-loose z-10")
  search

</template>

<script>
import Search from '@/components/search'

export default {
  name: 'header-bar',

  components: {
    Search,
  },
}
</script>
