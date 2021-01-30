import { ref } from 'vue'
import { getGoodsIndexService } from '@/api/goods'

const tableData = ref([])

const columns = [

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
