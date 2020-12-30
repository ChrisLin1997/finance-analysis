<template lang="pug">
.loading(ref="loadingElement")
  .line
  .line
  .line
  .line
  .line
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'loading',

  setup () {
    const loadingElement = ref(null)
    const setAnimationDelay = () => {
      const lineList = loadingElement.value.childNodes
      const delay = 0.2
      lineList.forEach((element, index) => {
        element.style.animationDelay = delay * index + 's'
      })
    }

    onMounted(() => setAnimationDelay())

    return {
      loadingElement,
    }
  },
}
</script>

<style lang="scss" scoped>
.loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #333333aa;
  transition: opacity .2s;
}

.line {
  display: inline-block;
  margin: 2px;
  width: 6px;
  height: 24px;
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