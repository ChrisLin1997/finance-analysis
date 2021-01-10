import { ref } from 'vue'
import usePriceChart from './priceChart'
import useIncomeChart from './incomeChart'
import useEpsChart from './epsChart'
import useInfo from './info'

export default function useStock (search) {
  const { priceChartOption, getStockPrice } = usePriceChart(search)
  const { incomeChartOption, getStockIncome } = useIncomeChart(search)
  const { epsChartOption, getStockEps } = useEpsChart(search)
  const { stockInfo, getStockInfo } = useInfo(search)

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
    getStockInfo()
    getStockPrice()
    getStockIncome()
    getStockEps()
  }

  return {
    chartList,

    stockInfo,
    priceChartOption,
    incomeChartOption,
    epsChartOption,

    getAllInfo,
  }
}
