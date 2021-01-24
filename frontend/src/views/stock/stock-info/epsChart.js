import { reactive, computed } from 'vue'
import { getTwstockEpsService } from '@/api/twstock'

export default function useEpsChart (search) {
  const epsInfo = reactive({
    season: [],
    eps: [],
  })
  const epsChartOption = computed(() => {
    return {
      type: 'bar',
      data: {
        labels: epsInfo.season,
        datasets: [
          {
            label: '每股盈餘',
            data: epsInfo.eps,
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

  const getStockEps = async () => {
    const submitData = {
      stockNo: search.value,
    }
    const result = await getTwstockEpsService(submitData)

    epsInfo.season = result.season
    epsInfo.eps = result.eps
  }

  return {
    epsChartOption,
    getStockEps,
  }
}
