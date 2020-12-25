import { xhr } from './xhr'
// import { getOpenDay } from '@/helper'

export const getTwstockHotService = async () => {
  return new Promise((resolve, reject) => {
    return xhr({
      method: 'get',
      url: 'twstock/hot',
    })
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}

export const getTwstockInfoService = async (formData) => {
  const params = {
    stockNo: formData.stockNo,
  }
  return new Promise((resolve, reject) => {
    return xhr({
      method: 'get',
      url: 'twstock/info',
      params,
    })
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}

export const getTwstockMerchantService = async (formData) => {
  const time = new Date()
  const params = {
    stockNo: formData.stockNo,
    time: time.getTime(),
  }
  return new Promise((resolve, reject) => {
    return xhr({
      method: 'get',
      url: 'twstock/merchant',
      params,
    })
      .then(res => resolve(res))
      .catch(() => {
        const err = {
          buy: [],
          sell: [],
        }
        reject(err)
      })
  })
}
