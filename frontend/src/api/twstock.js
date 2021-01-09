import { xhr } from './xhr'

export const getTwstockHotService = async () => {
  return await xhr({
    method: 'get',
    url: 'twstock/hot',
  })
    .then(res => res)
    .catch(() => ({ data: [], date: '' }))
}

export const getTwstockInfoService = async (formData) => {
  const params = {
    stockNo: formData.stockNo,
  }
  return await xhr({
    method: 'get',
    url: 'twstock/info',
    params,
  })
    .then(res => res)
    .catch(() => ({}))
}

export const getTwstockPriceService = async (formData) => {
  const params = {
    stockNo: formData.stockNo,
  }
  return await xhr({
    method: 'get',
    url: 'twstock/price',
    params,
  })
    .then(res => res)
    .catch(() => ({ date: [], price: [] }))
}

export const getTwstockMerchantService = async (formData) => {
  const time = new Date()
  const params = {
    stockNo: formData.stockNo,
    time: time.getTime(),
  }
  return await xhr({
    method: 'get',
    url: 'twstock/merchant',
    params,
  })
    .then(res => res)
    .catch(() => ({ stock: { buy: [], sell: [] }, odd: { buy: [], sell: [] } }))
}

export const getTwstockIncomeService = async (formData) => {
  const params = {
    stockNo: formData.stockNo,
  }
  return await xhr({
    method: 'get',
    url: 'twstock/income',
    params,
  })
    .then(res => res)
    .catch(() => ({ month: [], income: [] }))
}

export const getTwstockEpsService = async (formData) => {
  const params = {
    stockNo: formData.stockNo,
  }
  return await xhr({
    method: 'get',
    url: 'twstock/eps',
    params,
  })
    .then(res => res)
    .catch(() => ({ season: [], eps: [] }))
}
