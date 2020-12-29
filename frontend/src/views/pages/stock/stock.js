import { ref } from 'vue'
import { getTwstockInfoService, getTwstockMerchantService } from '@/api/twstock'

export default function searchStockInfo(searchQuery) {
  const stockNo = ref(searchQuery)
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

  const getTwstockInfo = async () => {
    if (stockNo.value === '') return
    const submitData = {
      stockNo: stockNo.value,
    }
    const result = await Promise.allSettled([
      getTwstockInfoService(submitData),
      getTwstockMerchantService(submitData),
    ])

    stockInfo.value = result.reduce((acc, curr) => Object.assign(acc, curr.value), stockInfo.value)
    
  }

  return {
    stockInfo,
    getTwstockInfo,
  }
}