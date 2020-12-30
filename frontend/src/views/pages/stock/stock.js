import { ref } from 'vue'
import router from '@/router'
import { getTwstockInfoService, getTwstockMerchantService } from '@/api/twstock'

export default function searchStockInfo() {
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
  })

  const getTwstockInfo = async (stockNo) => {
    if (stockNo === '') return
    const submitData = {
      stockNo: stockNo,
    }
    const result = await Promise.allSettled([
      getTwstockInfoService(submitData),
      getTwstockMerchantService(submitData),
    ])

    stockInfo.value = result.reduce((acc, curr) => Object.assign(acc, curr.value), stockInfo.value)
  }

  const userSearch = ref('')
  userSearch.value = router.currentRoute.value.query.stockNo
  
  const handleKeyEnter = () => {
    getTwstockInfo(userSearch.value)
    router.push({ query: { stockNo: userSearch.value } })
  }

  return {
    userSearch,
    handleKeyEnter,

    stockInfo,
    getTwstockInfo,
  }
}