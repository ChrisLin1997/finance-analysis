import { ref, reactive } from 'vue'
import { getTwstockMerchantService } from '@/api/twstock'

export default function useMerchant () {
  const merchantInfo = reactive({
    stock: { buy: [], sell: [] },
    odd: { buy: [], sell: [] },
  })

  const getMerchatInfo = async (stockNo) => {
    const submitData = { stockNo: stockNo }
    const result = await getTwstockMerchantService(submitData)
    merchantInfo.stock = result.stock
    merchantInfo.odd = result.odd
  }

  const activeMerchant = ref('stock')
  const handleMerchant = (type) => {
    activeMerchant.value = type
  }

  return {
    activeMerchant,
    handleMerchant,
    merchantInfo,
    getMerchatInfo,
  }
}
