<template lang="pug">
.loading(v-show="isVisible")
  .line
  .line
  .line
  .line
  .line
</template>

<script>
import { toRef, onMounted } from 'vue'

export default {
  name: 'loading',

  props: {
    visible: {
      type: Boolean,
      required: true,
    }
  },

  setup (props) {
    const isVisible = toRef(props.visible)
    const setAnimationDelay = () => {
      if (props.isLoading) {
        const lineList = document.getElementsByClassName('loading')[0].childNodes
        const delay = 0.2
        lineList.forEach((element, index) => {
          element.style.animationDelay = delay * index + 's'
        })
      }
    }
    onMounted(() => setAnimationDelay())

    return {
      isVisible,
    }
  },
}
</script>

<style lang="scss" scoped>
.loading {
  position: absolute;
  // top: 0;
  // left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #333333aa;
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