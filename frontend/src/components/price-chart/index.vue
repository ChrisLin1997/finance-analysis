<template lang="pug">
.price-chart
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

        maintainAspectRatio: false,

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
              color: '#44475a',
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
          xPadding: 16,
          yPadding: 8,
          custom: (element) => {
            element.x = 8
            element.y = 8
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
.price-chart {
  padding: 64px 24px 0;
  width: 100%;
  height: 360px;
  text-align: left;
}
</style>
