import { ref, reactive } from 'vue'
import { getCurrencyExchange } from '@/api/currency'

const tableData = reactive({
  foreign: [],
  local: [],
})

const getExchangeList = async () => {
  const result = await getCurrencyExchange()
  tableData.foreign = result.foreign
  tableData.local = result.local
}

const columns = ref([
  { label: '幣別', prop: 'name', class: () => 'name' },
  { label: '價格', prop: 'price', class: (value) => value ? 'up' : 'down' },
  { label: '漲跌幅', prop: 'change', class: (value) => value ? 'up' : 'down' },
  { label: '漲跌幅百分比', prop: 'changePercent', class: (value) => value ? 'up' : 'down' },
  { label: '買進', prop: 'buy' },
  { label: '賣出', prop: 'sell' },
])

const activeTable = ref('foreign')
const handleActive = (value) => {
  activeTable.value = value
}

export function useTable () {
  return {
    tableData,
    columns,
    getExchangeList,

    activeTable,
    handleActive,
  }
}
