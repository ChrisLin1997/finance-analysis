import { ref, watchEffect } from 'vue'

export default function useEpsChart (stockInfo) {
  const epsChartOption = ref({})
  watchEffect(() => {
    epsChartOption.value = {
      type: 'bar',
      data: {
        labels: stockInfo.value.season,
        datasets: [
          {
            label: '營收',
            data: stockInfo.value.eps,
            backgroundColor: '#df9931',
          },
        ],
      },

      options: {
        layout: {
          padding: { top: 16, bottom: 8 },
        },
        legend: {
          display: false,
        },
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            gridLines: { display: false },
            ticks: {
              fontColor: '#fff',
              maxRotation: 0,
              callback: (value, index) => {
                return index % 3 === 2 ? value : ''
              },
            },
          }],
          yAxes: [{
            position: 'right',
            textAlign: 'right',
            gridLines: { color: '#555' },
            ticks: {
              fontColor: '#fff',
              beginAtZero: true,
            },
          }],
        },

        tooltips: {
          mode: 'index',
          enabled: true,
          intersect: false,
          displayColors: true,
          cornerRadius: 0,
          caretSize: 0,
        },
      },
    }
  })

  return {
    epsChartOption,
  }
}
