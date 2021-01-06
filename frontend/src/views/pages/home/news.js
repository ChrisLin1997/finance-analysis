import { ref, computed } from 'vue'
import {
  getGoogleNewsService,
} from '@/api/info'

export default function useNews () {
  const allGlobalNews = ref([])
  const getGlobalNews = async () => {
    const submitData = { type: 'global' }
    allGlobalNews.value = await getGoogleNewsService(submitData)
  }
  const globalPage = ref(1)
  const globalNews = computed(() => allGlobalNews.value.slice((globalPage.value - 1) * 10, globalPage.value * 10))

  const allFinanceNews = ref([])
  const getFinanceNews = async () => {
    const submitData = { type: 'finance' }
    allFinanceNews.value = await getGoogleNewsService(submitData)
  }
  const financePage = ref(1)
  const financeNews = computed(() => allFinanceNews.value.slice((financePage.value - 1) * 10, financePage.value * 10))

  const newsTypeList = ref([
    {
      code: 'global',
      name: '國際',
      list: globalNews,
      page: globalPage,
    },
    {
      code: 'finance',
      name: '商業',
      list: financeNews,
      page: financePage,
    },
    {
      code: 'ptt',
      name: 'PTT',
      list: [],
      page: 1,
    },
  ])

  getGlobalNews()
  getFinanceNews()

  return {
    globalPage,
    financePage,

    newsTypeList,
  }
}
