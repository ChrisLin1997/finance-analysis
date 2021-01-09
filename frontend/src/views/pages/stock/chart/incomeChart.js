import { reactive, computed } from 'vue'
import { getTwstockIncomeService } from '@/api/twstock'

export default function useIncomeChart (search) {
  const incomeInfo = reactive({
    month: [],
    income: [],
  })
  const incomeChartOption = computed(() => {
    return {
      type: 'bar',
      data: {
        labels: incomeInfo.month,
        datasets: [
          {
            label: '營收',
            data: incomeInfo.income,
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
              display: incomeInfo.income?.length !== 0,
              fontColor: '#fff',
              beginAtZero: true,
              maxTicksLimit: incomeInfo.income?.length ? 8 : 0,
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

  const getStockIncome = async () => {
    const submitData = { stockNo: search.value }
    const result = await getTwstockIncomeService(submitData)

    incomeInfo.month = result.month
    incomeInfo.income = result.income
  }

  return {
    incomeChartOption,
    getStockIncome,
  }
}
