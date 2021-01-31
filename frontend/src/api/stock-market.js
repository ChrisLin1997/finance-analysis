import { xhr } from './xhr'

export const getTwHotService = () => {
  return xhr({
    method: 'get',
    url: 'stockmarket/tw/hot',
    defaultData: { data: [], date: '' },
  })
}

export const getTwWeightService = () => {
  return xhr({
    method: 'get',
    url: 'stockmarket/tw/weight',
    defaultData: [],
  })
}

export const getUsHotService = () => {
  return xhr({
    method: 'get',
    url: 'stockmarket/us/hot',
    defaultData: [],
  })
}
