import { reactive, computed } from 'vue'
import { getTwstockInfoService } from '@/api/twstock'

export default function usePriceChart (search) {
  const priceInfo = reactive({
    date: [],
    price: [],
  })

  const priceChartOption = computed(() => {
    return {
      type: 'line',
      data: {
        labels: priceInfo.date,
        datasets: [
          {
            label: '股價',
            data: priceInfo.price,
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
            ticks: {
              fontColor: '#fff',
              maxRotation: 0,
              callback: (value, index) => {
                return index % 4 === 0 ? value : ''
              },
            },
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

  const getStockPrice = async () => {
    const submitData = {
      stockNo: search.value,
    }
    const result = await getTwstockInfoService(submitData)

    priceInfo.date = result.date
    priceInfo.price = result.price
  }

  return {
    priceChartOption,
    getStockPrice,
  }
}
