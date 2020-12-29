import { ref } from 'vue'
import { getTwstockInfoService, getTwstockMerchantService } from '@/api/twstock'

export default function stockInfo(stockNo) {
  const stockNo = ref(stockNo)
  const stockInfo = ref({})

  const getTwstockInfo = async () => {
    if (stockNo.value === '') return
    const submitData = {
      stockNo: stockNo.value,
    }
    const result = await Promise.allSettled([
      getTwstockInfoService(submitData),
      getTwstockMerchantService(submitData),
    ])

    stockInfo.value = result.reduce((acc, curr) => Object.assign(acc, curr.value), {})
  }


  return {
    stockInfo,
    getTwstockInfo,
  }
}