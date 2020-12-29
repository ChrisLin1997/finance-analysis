<template lang="pug">
.home(v-loading="true")
  h3 home
  loading
</template>

<script>
import loading from '@/components/loading'

export default {
  name: 'home',

  components: {
    loading
  },

  setup () {
  }
}
</script>
