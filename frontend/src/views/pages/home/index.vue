<template lang="pug">
.home(v-loading="test")
  h3 home
  button(@click="change") change
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'home',

  setup () {
    const test = ref(true)
    const change = () => test.value = !test.value
    return {
      test,
      change,
    }
  }
}
</script>
