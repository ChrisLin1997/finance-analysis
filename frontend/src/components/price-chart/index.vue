<template lang="pug">
.chart
  canvas(ref="canvasElement")
</template>

<script>
import Chart from 'chart.js'
import { ref, computed, onUpdated } from 'vue'

export default {
  name: 'price-chart',

  props: {
    dateList: {
      type: Array,
      required: true,
    },

    priceList: {
      type: Array,
      required: true,
    },
  },

  setup (props) {
    const dateList = computed(() => props.dateList)
    const priceList = computed(() => props.priceList)
    const canvasElement = ref(null)
    const chartInstance = ref(null)
    const chartOptions = computed(() => ({
      type: 'line',
      data: {
        labels: dateList.value,
        datasets: [
          {
            label: '股價',
            data: priceList.value,
            borderColor: '#3ca9c0',
            borderWidth: 2,
            pointRadius: 0,
            lineTension: 0,
          },
        ],
      },
      options: {
        layout: {
          padding: {
            top: 16,
            bottom: 8,
          },
        },

        legend: {
          display: false,
        },

        scales: {
          xAxes: [{
            gridLines: {
              display: false,
            },
            ticks: {
              display: false,
            },
          }],
          yAxes: [{
            position: 'right',
            gridLines: {
              display: false,
            },
            ticks: {
              padding: 8,
              fontColor: 'white',
            },
          }],
        },

        tooltips: {
          mode: 'index',
          enabled: true,
          intersect: false,
          displayColors: false,
          cornerRadius: 0,
          caretSize: 0,
          custom: (element) => {
            // const center = canvasElement.value.getBoundingClientRect().width / 2
            element.x = 0
            element.y = 0
            // if (element.caretX > center) element.x = 70
            // else element.x = canvasElement.value.getBoundingClientRect().width - 100
          },
        },
      },
    }))

    onUpdated(() => {
      if (canvasElement.value && dateList.value.length && priceList.value.length) {
        chartInstance.value = new Chart(canvasElement.value, chartOptions.value)
      }
    })

    return {
      canvasElement,
    }
  },
}
</script>

<style lang="scss" scoped>
.chart {
  width: 100%;
  background-color: $active-background;
}
</style>
