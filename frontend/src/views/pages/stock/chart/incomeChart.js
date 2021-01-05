import { ref, watchEffect } from 'vue'

export default function useIncomeChart (stockInfo) {
  const incomeChartOption = ref({})
  watchEffect(() => {
    incomeChartOption.value = {
      type: 'bar',
      data: {
        labels: stockInfo.value.month.reverse(),
        datasets: [
          {
            label: '營收',
            data: stockInfo.value.income,
            backgroundColor: '#3d8c40',
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
              maxTicksLimit: stockInfo.value.income?.length ? 8 : 0,
              callback: value => {
                if (value === 0) return value
                else return value / 100000000 >= 1 ? value / 100000000 + '億' : value / 1000000 + '百萬'
              },
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
    incomeChartOption,
  }
}
