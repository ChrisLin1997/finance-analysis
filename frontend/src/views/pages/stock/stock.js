import { ref, watchEffect } from 'vue'
import router from '@/router'
import {
  getTwstockInfoService,
  getTwstockMerchantService,
  getTwstockIncomeService,
  getTwstockEpsService,
} from '@/api/twstock'

export default function useStockInfo (options) {
  // info
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

  // get query
  const userSearch = ref('')

  // api
  const getTwstockInfo = async () => {
    if (userSearch.value === '') return

    options.loadStatus.value++

    const submitData = { stockNo: userSearch.value }
    const result = await Promise.allSettled([
      getTwstockInfoService(submitData),
      getTwstockMerchantService(submitData),
      getTwstockIncomeService(submitData),
      getTwstockEpsService(submitData),
    ])
    stockInfo.value = result.reduce((acc, curr) => Object.assign(acc, curr.value), stockInfo.value)

    options.loadStatus.value--
  }

  watchEffect(() => {
    userSearch.value = router.currentRoute.value.query.stockNo
    getTwstockInfo()
  })

  return {
    stockInfo,
  }
}
