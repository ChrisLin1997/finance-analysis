import { ref, reactive } from 'vue'
import { getCurrencyIndexService } from '@/api/currency'

const tableData = reactive({
  foreign: [],
  local: [],
})

const getCurrencyIndex = async () => {
  const result = await getCurrencyIndexService()
  tableData.foreign = result.foreign
  tableData.local = result.local
}

const columns = [
  { label: '幣別', prop: 'name', class: () => 'name' },
  { label: '價格', prop: 'price', icon: true, class: (value) => value ? 'text-up' : 'text-down' },
  { label: '漲跌幅', prop: 'change', icon: true, class: (value) => value ? 'text-up' : 'text-down' },
  { label: '漲跌幅百分比', prop: 'changePercent', icon: true, class: (value) => value ? 'text-up' : 'text-down' },
  { label: '買進', prop: 'buy', class: () => 'text-active' },
  { label: '賣出', prop: 'sell', class: () => 'text-active' },
]

const activeTable = ref('foreign')
const handleActive = (value) => {
  activeTable.value = value
}

export function useTable () {
  return {
    tableData,
    columns,
    getCurrencyIndex,

    activeTable,
    handleActive,
  }
}
