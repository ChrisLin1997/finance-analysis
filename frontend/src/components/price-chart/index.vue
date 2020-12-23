<template lang="pug">
.chart
  canvas(ref="canvasElement")
</template>

<script>
import Chart from 'chart.js'
import { ref, onMounted } from 'vue'

export default {
  name: 'price-chart',

  props: {
    data: {
      type: Object,
    },

    options: {
      type: Object,
      default: () => {},
    },
  },

  setup (props) {
    const canvasElement = ref(null)
    const chartInstance = ref(null)
    const chartOptions = {
      type: 'line',
      data: {
        // labels: props.data.date,
        labels: ['2020/12/01', '2020/12/02', '2020/12/03', '2020/12/04', '2020/12/05', '2020/12/06', '2020/12/07', '2020/12/08', '2020/12/09', '2020/12/10', '2020/12/11', '2020/12/12', '2020/12/13', '2020/12/14', '2020/12/15', '2020/12/01', '2020/12/02', '2020/12/03', '2020/12/04', '2020/12/05', '2020/12/06', '2020/12/07', '2020/12/08', '2020/12/09', '2020/12/10', '2020/12/11', '2020/12/12', '2020/12/13', '2020/12/14', '2020/12/15'],
        datasets: [
          {
            pointRadius: 0,
            label: '股價',
            // data: props.data.price,
            data: [100, 103, 110, 121, 143, 157, 180, 171, 152, 140, 127, 164, 192, 217, 200, 213, 207, 215, 240, 250, 243, 255, 269, 253, 256, 254, 267, 251, 270, 287],
            borderColor: '#3ca9c0',
            borderWidth: 2,
            lineTension: 0,
          },
        ],
      },
      options: {
        layout: {
          padding: 24,
        },

        legend: {
          display: false,
        },

        scales: {
          xAxes: [{
            ticks: {
              display: false,
            },
          }],
          yAxes: [{
            ticks: {
              position: 'right',
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
            element.x = 70
            element.y = 4
            // if (element.caretX > center) element.x = 70
            // else element.x = canvasElement.value.getBoundingClientRect().width - 100
          },
        },
      },
    }

    onMounted(() => {
      chartInstance.value = new Chart(canvasElement.value, chartOptions)
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
