<template lang="pug">
.loading(ref="loadingElement" class=" absolute top-0 left-0 w-full h-full flex justify-center items-center bg-loading")
  .line(class="mr-1 inline-block w-2 h-8 animate-line bg-gray-800")
  .line(class="mr-1 inline-block w-2 h-8 animate-line bg-gray-800")
  .line(class="mr-1 inline-block w-2 h-8 animate-line bg-gray-800")
  .line(class="mr-1 inline-block w-2 h-8 animate-line bg-gray-800")
  .line(class="mr-1 inline-block w-2 h-8 animate-line bg-gray-800")
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'loading',

  setup () {
    const loadingElement = ref(null)
    const setAnimationDelay = () => {
      const lineList = loadingElement.value.childNodes
      const delay = 0.1
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
