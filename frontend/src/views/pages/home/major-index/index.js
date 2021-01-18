import { ref } from 'vue'
import { getMajorIndexService } from '@/api/info'

export default function useIndex () {
  const indexColumns = [
    { label: '名稱', prop: 'name', class: () => 'name' },
    { label: '價格', prop: 'price', class: (value) => value ? 'up' : 'down' },
    { label: '漲跌幅', prop: 'change', class: (value) => value ? 'up' : 'down' },
    { label: '漲跌幅百分比', prop: 'changePercent', class: (value) => value ? 'up' : 'down' },
    { label: '當日最低價', prop: 'low', class: () => 'down' },
    { label: '當日最高價', prop: 'high', class: () => 'up' },
  ]
  const majorIndexList = ref([])
  const getMajorIndex = async () => {
    majorIndexList.value = await getMajorIndexService()
  }
  getMajorIndex()

  return {
    majorIndexList,
    indexColumns,
  }
}
