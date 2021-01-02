import { ref } from 'vue'
import router from '@/router'
import {
  getTwstockInfoService,
  getTwstockMerchantService,
  getTwstockIncomeService,
} from '@/api/twstock'


export default function searchStockInfo(options) {
  const stockInfo = ref({
    id: '',
    name: '',
    ipoTime: '',
    industry: '',
    date: [],
    price: [],
    variation: 0.00,
    percent: 0.00,
    currencyPrice: 0.00,
    status: false,
    stock: { buy: [], sell: [] },
    odd: { buy: [], sell: [] },
    icome: [],
    month: [],
  })

  const getTwstockInfo = async (stockNo) => {
    if (stockNo === '') return

    options.loadStatus.value++

    const submitData = { stockNo }
    const result = await Promise.allSettled([
      getTwstockInfoService(submitData),
      getTwstockMerchantService(submitData),
      getTwstockIncomeService(submitData)
    ])
    stockInfo.value = result.reduce((acc, curr) => Object.assign(acc, curr.value), stockInfo.value)

    options.loadStatus.value--
  }

  // get query
  const userSearch = ref('')
  userSearch.value = router.currentRoute.value.query.stockNo
  
  const handleKeyEnter = async () => {
    options.loadStatus.value++

    await getTwstockInfo(userSearch.value)
    router.push({ query: { stockNo: userSearch.value } })

    options.loadStatus.value--
  }

  return {
    userSearch,
    handleKeyEnter,

    stockInfo,
    getTwstockInfo,
  }
}