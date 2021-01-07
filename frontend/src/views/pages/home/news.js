import { ref } from 'vue'
import {
  getGoogleNewsService,
  getPttService,
} from '@/api/info'

export default function useNews () {
  // global
  const allGlobalNews = ref([])
  const globalPage = ref(1)
  const preGlobalPage = ref(0)
  const getGlobalNews = async () => {
    const submitData = { type: 'global' }
    allGlobalNews.value = await getGoogleNewsService(submitData)
  }

  // finance
  const allFinanceNews = ref([])
  const financePage = ref(1)
  const prevFinancePage = ref(0)
  const getFinanceNews = async () => {
    const submitData = { type: 'finance' }
    allFinanceNews.value = await getGoogleNewsService(submitData)
  }

  // ptt
  const allPttNews = ref([])
  const pttPage = ref(1)
  const prevPttPage = ref(0)
  const getPttNews = async () => {
    allPttNews.value = await getPttService()
  }

  const newsTypeList = ref([
    {
      code: 'global',
      name: '國際',
      list: allGlobalNews,
      page: globalPage,
      prePage: preGlobalPage,
    },
    {
      code: 'finance',
      name: '商業',
      list: allFinanceNews,
      page: financePage,
      prePage: prevFinancePage,
    },
    {
      code: 'ptt',
      name: 'PTT',
      list: allPttNews,
      page: pttPage,
      prePage: prevPttPage,
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
