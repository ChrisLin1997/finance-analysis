import { ref } from 'vue'
import { getTwstockInfoService } from '@/api/twstock'

export default function useInfo (search) {
  // info
  const stockInfo = ref({
    id: '',
    name: '',
    price: 0.00,
    change: 0.00,
    changePercent: 0.00,
    currency: '',
    isUp: false,
  })

  const getStockInfo = async () => {
    const submitData = { stockNo: search.value }
    const result = await getTwstockInfoService(submitData)
    stockInfo.value = result
  }

  return {
    stockInfo,
    getStockInfo,
  }
}
