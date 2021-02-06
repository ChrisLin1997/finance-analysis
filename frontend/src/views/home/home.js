import { ref } from 'vue'
import { getGoogleNewsService, getPttService, getMajorIndexService } from '@/api/home'
import { useLoading } from '@/use/loading'

// global
const allGlobalNews = ref([])
const globalPage = ref(1)
const globalLoader = useLoading()
const getGlobalNews = async () => {
  const submitData = { type: 'technology' }
  globalLoader.load()
  allGlobalNews.value = await getGoogleNewsService(submitData)
  globalLoader.unload()
}

// finance
const allFinanceNews = ref([])
const financePage = ref(1)
const financeLoader = useLoading()
const getFinanceNews = async () => {
  const submitData = { type: 'business' }
  financeLoader.load()
  allFinanceNews.value = await getGoogleNewsService(submitData)
  financeLoader.unload()
}

// ptt
const allPttNews = ref([])
const pttPage = ref(1)
const pttLoader = useLoading()
const getPttNews = async () => {
  pttLoader.load()
  allPttNews.value = await getPttService()
  pttLoader.unload()
}

const getAllNews = () => {
  getGlobalNews()
  getFinanceNews()
  getPttNews()
}

const newsTypeList = ref([
  {
    code: 'global',
    name: '國際',
    icon: ['fas', 'globe'],
    isLoading: globalLoader.isLoading,
    list: allGlobalNews,
    page: globalPage,
  },
  {
    code: 'finance',
    name: '商業',
    icon: ['fas', 'coins'],
    isLoading: financeLoader.isLoading,
    list: allFinanceNews,
    page: financePage,
  },
  {
    code: 'ptt',
    name: 'PTT',
    icon: ['fas', 'newspaper'],
    isLoading: pttLoader.isLoading,
    list: allPttNews,
    page: pttPage,
  },
])

export function useNews () {
  return {
    globalPage,
    financePage,
    pttPage,

    getAllNews,

    newsTypeList,
  }
}

const columns = [
  { label: '名稱', prop: 'name', class: () => 'name' },
  { label: '價格', prop: 'price', icon: true, class: (value) => value ? 'text-up' : 'text-down' },
  { label: '漲跌幅', prop: 'change', icon: true, class: (value) => value ? 'text-up' : 'text-down' },
  { label: '漲跌幅百分比', prop: 'changePercent', icon: true, class: (value) => value ? 'text-up' : 'text-down' },
  { label: '當日最低價', prop: 'low', class: () => 'text-down' },
  { label: '當日最高價', prop: 'high', class: () => 'text-up' },
]

const majorIndexList = ref([])

const getMajorIndex = async () => {
  majorIndexList.value = await getMajorIndexService()
}

export function useIndex () {
  return {
    majorIndexList,
    columns,

    getMajorIndex,
  }
}
