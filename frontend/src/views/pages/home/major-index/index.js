import { ref } from 'vue'
import { getMajorIndexService } from '@/api/info'

export default function useIndex () {
  const majorIndexList = ref([])
  const getMajorIndex = async () => {
    majorIndexList.value = await getMajorIndexService()
  }
  getMajorIndex()

  return {
    majorIndexList,
  }
}
