import { ref, watchEffect } from 'vue'

export default function usePriceChart (stockInfo) {
  const priceChartOption = ref({})
  watchEffect(() => {
    priceChartOption.value = {
      type: 'line',
      data: {
        labels: stockInfo.value.date,
        datasets: [
          {
            label: '股價',
            data: stockInfo.value.price,
            borderColor: '#3ca9c0',
            borderWidth: 3,
            pointRadius: 0,
            lineTension: 0,
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
            ticks: { display: false },
          }],
          yAxes: [{
            position: 'right',
            gridLines: { color: '#555' },
            ticks: { padding: 8, fontColor: '#fff' },
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
    }
  })

  return {
    priceChartOption,
  }
}
