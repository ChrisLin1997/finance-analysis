import { ref } from 'vue'

export default function viewMerchant () {
  const merchantType = [
    { label: '整股', code: 'stock' },
    { label: '零股', code: 'odd' },
  ]

  const merchantList = [
    { label: '委買', code: 'buy' },
    { label: '委賣', code: 'sell' },
  ]

  const activeMerchant = ref('stock')
  const handleMerchant = (type) => {
    activeMerchant.value = type
  }

  return {
    merchantType,
    merchantList,
    activeMerchant,
    handleMerchant,
  }
}