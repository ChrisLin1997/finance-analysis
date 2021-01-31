import { xhr } from './xhr'

export const getTwETFService = () => {
  return xhr({
    method: 'get',
    url: 'stockmarket/tw/etf',
    defaultData: [],
  })
}

export const getTwHotService = () => {
  return xhr({
    method: 'get',
    url: 'stockmarket/tw/hot',
    defaultData: [],
  })
}

export const getTwMarketValueService = () => {
  return xhr({
    method: 'get',
    url: 'stockmarket/tw/marketValue',
    defaultData: [],
  })
}

export const getUsMarketValueService = () => {
  return xhr({
    method: 'get',
    url: 'stockmarket/us/marketValue',
    defaultData: [],
  })
}
