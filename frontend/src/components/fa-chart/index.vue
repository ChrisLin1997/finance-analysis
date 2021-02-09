<template lang="pug">
.fa-chart(class="pt-12 px-6 pb-3 relative bg-grayPrimary rounded-lg")
  .symbol(ref="symbolElement" class="py-3 px-4 w-fit h-fit min-w-symbol absolute flex justify-evenly items-center -top-6 left-4 text-xl leading-5 font-bold rounded")
    slot
  canvas(ref="canvasElement")
</template>

<script>
import { ref, onMounted, watchEffect } from 'vue'
import Chart from 'chart.js'

export default {
  name: 'fa-chart',

  props: {
    color: {
      type: String,
      default: 'green',
      validator (value) {
        return ['green', 'red', 'yellow', 'blue'].includes(value)
      },
    },

    options: {
      type: Object,
      required: true,
    },
  },

  setup (props) {
    const colorMapping = {
      green: '#3d8c40',
      red: '#b51249',
      yellow: '#faa515',
      blue: '#03b7f2',
    }
    // symbol style
    const symbolElement = ref(null)
    onMounted(() => { symbolElement.value.style.background = colorMapping[props.color] })

    // chart instance
    const canvasElement = ref(null)
    const chartInstance = ref(null)
    onMounted(() => { chartInstance.value = new Chart(canvasElement.value, props.options) })
    watchEffect(() => {
      if (chartInstance.value === null) return
      chartInstance.value.data.labels = props.options.data.labels
      chartInstance.value.data.datasets = props.options.data.datasets
      chartInstance.value.update()
    })

    return {
      symbolElement,
      canvasElement,
    }
  },
}
</script>
