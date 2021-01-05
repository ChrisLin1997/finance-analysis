import { ref } from 'vue'
import usePriceChart from './priceChart'
import useIncomeChart from './incomeChart'
import useEpsChart from './epsChart'

export default function useCharts (stockInfo) {
  const { priceChartOption } = usePriceChart(stockInfo)
  const { incomeChartOption } = useIncomeChart(stockInfo)
  const { epsChartOption } = useEpsChart(stockInfo)
  const chartList = ref([
    {
      code: 'income',
      label: '營收',
      icon: ['fas', 'coins'],
      color: 'green',
      option: incomeChartOption,
    },
    {
      code: 'eps',
      label: 'EPS',
      icon: ['fas', 'chart-bar'],
      color: 'yellow',
      option: epsChartOption,
    },
  ])

  return {
    priceChartOption,
    incomeChartOption,
    epsChartOption,

    chartList,
  }
}
