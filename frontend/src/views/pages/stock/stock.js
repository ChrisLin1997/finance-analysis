import { ref } from 'vue'

export default function useStockInfo () {
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

  return {
    stockInfo,
  }
}
