<template lang="pug">
.chart
  canvas(ref="canvasElement" :data="data" :options="options")
</template>

<script>
import Chart from 'chart.js'
import { ref, onMounted } from 'vue'

export default {
  name: 'price-chart',

  props: {
    dateList: {
      type: Array,
      default: () => [],
    },

    dataList: {
      type: Array,
      default: () => [],
    },

    options: {
      type: Object,
      default: () => {},
    },
  },

  setup (props) {
    const canvasElement = ref(null)
    const chartInstance = ref(null)

    onMounted(() => {
      chartInstance.value = new Chart(canvasElement.value, {
        type: 'line',
        data: {
          // labels: props.dateList,
          labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
          datasets: [
            {
              pointRadius: 0,
              label: 'price',
              // data: props.dataList,
              data: [100, 103, 110, 121, 143, 157, 180, 171, 152, 140, 127, 164, 192, 217, 200, 213, 207, 215, 240, 250, 243, 255, 269, 253, 256, 254, 267, 251, 270, 287],
              borderColor: '#3ca9c0',
              borderWidth: 2,
              lineTension: 0,
            },
          ],
        },
        options: {
          tooltips: {
            mode: 'index',
            enabled: true,
            intersect: false,
          },
        },
      })
    })

    return {
      canvasElement,
    }
  },
}
</script>

<style lang="scss" scoped>
.chart {
  width: 300px;
  background-color: $active-background;
}
</style>
