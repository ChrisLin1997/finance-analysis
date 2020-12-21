import { xhr } from './xhr'
// import { getOpenDay } from '@/helper'

export const getTwstockHotService = async () => {
  return new Promise((resolve, reject) => {
    return xhr({
      method: 'get',
      url: 'twstock/hot',
    })
      .then(res => resolve(res))
      .catch((err) => {
        console.log(err)
        reject(err)
      })
  })
}

export const getTwstockInfoService = async (formData) => {
  const params = {
    stockId: formData.stockId,
  }
  return new Promise((resolve, reject) => {
    return xhr({
      method: 'get',
      url: 'twstock/info',
      params,
    })
      .then(res => resolve(res))
      .catch(() => {
        const err = {
          date: [],
          transAmount: [],
          transactions: [],
          open: [],
          close: [],
          high: [],
          low: [],
        }
        reject(err)
      })
  })
}
