import { ref } from 'vue'
import {
  getGoogleNewsService,
  getPttService,
  getMajorIndexService,
} from '@/api/home'

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
    list: allGlobalNews,
    page: globalPage,
    prePage: preGlobalPage,
  },
  {
    code: 'finance',
    name: '商業',
    icon: ['fas', 'coins'],
    list: allFinanceNews,
    page: financePage,
    prePage: prevFinancePage,
  },
  {
    code: 'ptt',
    name: 'PTT',
    icon: ['fas', 'newspaper'],
    list: allPttNews,
    page: pttPage,
    prePage: prevPttPage,
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

export function useIndex () {
  return {
    majorIndexList,
    columns,

    getMajorIndex,
  }
}
