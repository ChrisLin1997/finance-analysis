import { ref } from 'vue'
import { getGoodsIndexService } from '@/api/goods'

const tableData = ref([])

const columns = [
  { label: '名稱', prop: 'name', class: () => 'name' },
  { label: '價格', prop: 'price', icon: true, class: (value) => value ? 'text-up' : 'text-down' },
  { label: '漲跌幅', prop: 'change', icon: true, class: (value) => value ? 'text-up' : 'text-down' },
  { label: '漲跌幅百分比', prop: 'changePercent', icon: true, class: (value) => value ? 'text-up' : 'text-down' },
  { label: '最低價', prop: 'low', class: () => 'text-down' },
  { label: '最高價', prop: 'high', class: () => 'text-up' },
]

const getGoodsIndex = async () => {
  tableData.value = await getGoodsIndexService()
}

export function useTable () {
  return {
    tableData,
    columns,
    getGoodsIndex,
  }
}
