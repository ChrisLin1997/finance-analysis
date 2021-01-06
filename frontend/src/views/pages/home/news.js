import { ref, computed } from 'vue'
import {
  getGoogleNewsService,
  getPttService,
} from '@/api/info'

export default function useNews () {
  // global
  const allGlobalNews = ref([])
  const globalPage = ref(1)
  const globalNews = computed(() => allGlobalNews.value.slice((globalPage.value - 1) * 10, globalPage.value * 10))
  const getGlobalNews = async () => {
    const submitData = { type: 'global' }
    allGlobalNews.value = await getGoogleNewsService(submitData)
  }

  // finance
  const allFinanceNews = ref([])
  const financePage = ref(1)
  const financeNews = computed(() => allFinanceNews.value.slice((financePage.value - 1) * 10, financePage.value * 10))
  const getFinanceNews = async () => {
    const submitData = { type: 'finance' }
    allFinanceNews.value = await getGoogleNewsService(submitData)
  }

  // ptt
  const allPttNews = ref([])
  const pttPage = ref(1)
  const pttNews = computed(() => allPttNews.value.slice((pttPage.value - 1) * 10, pttPage.value * 10))
  const getPttNews = async () => {
    allPttNews.value = await getPttService()
  }

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
      list: pttNews,
      page: pttPage,
    },
  ])

  getGlobalNews()
  getFinanceNews()
  getPttNews()

  return {
    globalPage,
    financePage,
    pttPage,

    newsTypeList,
  }
}
