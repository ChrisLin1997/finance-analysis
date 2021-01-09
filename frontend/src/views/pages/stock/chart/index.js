import { ref } from 'vue'
import usePriceChart from './priceChart'
import useIncomeChart from './incomeChart'
import useEpsChart from './epsChart'

export default function useCharts (stockNo) {
  const { priceChartOption, getStockPrice } = usePriceChart(stockNo)
  const { incomeChartOption, getStockIncome } = useIncomeChart(stockNo)
  const { epsChartOption, getStockEps } = useEpsChart(stockNo)
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

  const getAllInfo = () => {
    // getStockPrice()
    getStockIncome()
    getStockEps()
  }

  return {
    chartList,

    priceChartOption,
    incomeChartOption,
    epsChartOption,

    getAllInfo,
  }
}
