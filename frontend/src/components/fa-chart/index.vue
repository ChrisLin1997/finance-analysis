<template lang="pug">
.fa-chart
  .symbol(ref="symbolElement")
    slot
  canvas.canvas(ref="canvasElement")
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
    },
  },

  setup (props) {
    // symbol style
    const colorMapping = {
      green: '#3d8c40',
      red: '#b51249',
      yellow: '#df9931',
      blue: '#3ca9c0',
    }
    const symbolElement = ref(null)
    onMounted(() => { symbolElement.value.style.background = colorMapping[props.color] })

    // chart instance
    const options = ref(props.options)
    const canvasElement = ref(null)
    const chartInstance = ref(null)
    onMounted(() => { chartInstance.value = new Chart(canvasElement.value, options.value) })
    watchEffect(() => {
      if (chartInstance.value === null) return
      console.log('更新')
      chartInstance.value.data = options.value.data
      chartInstance.value.options = options.value.options
      chartInstance.value.update()
    })

    return {
      symbolElement,
      canvasElement,
    }
  },
}
</script>

<style lang="scss" scoped>
.fa-chart {
  padding: 48px 24px 12px;
  position: relative;
  background-color: $active-background;
}

.symbol {
  position: absolute;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  top: -24px;
  left: 16px;
  padding: 8px 16px;
  width: fit-content;
  min-width: 100px;
  height: fit-content;
  font-size: 18px;
  font-weight: bold;
  border-radius: 4px;
}
</style>
