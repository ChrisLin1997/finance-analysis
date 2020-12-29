<template lang="pug">
.loading
  .line
  .line
  .line
  .line
  .line
</template>

<script>
import { onMounted } from 'vue'

export default {
  name: 'loading',

  setup () {
    const setAnimationDelay = () => {
      const lineList = document.getElementsByClassName('loading')[0].childNodes
      const delay = 0.2
      lineList.forEach((element, index) => {
        element.style.animationDelay = delay * index + 's'
      })
    }
    onMounted(() => setAnimationDelay())
  },
}
</script>

<style lang="scss" scoped>
.loading {
  display: flex;
  align-items: center;
}

.line {
  display: inline-block;
  margin: 1px;
  width: 4px;
  height: 16px;
  background-color: $active-background;
  animation: line 1.2s infinite;
}

@keyframes line {
  20% {
    transform: scaleY(1.4);
    background-color: $active;
  }
  80% {
    transform: scaleY(1)
  }
}
</style>