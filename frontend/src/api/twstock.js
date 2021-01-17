import { xhr } from './xhr'

export const getTwstockHotService = () => {
  return xhr({
    method: 'get',
    url: 'twstock/hot',
  })
    .then(res => res)
    .catch(() => ({ data: [], date: '' }))
}

export const getTwstockInfoService = (formData) => {
  const params = {
    stockNo: formData.stockNo,
  }
  return xhr({
    method: 'get',
    url: 'twstock/info',
    params,
  })
    .then(res => res)
    .catch(() => ({}))
}

export const getTwstockPriceService = (formData) => {
  const params = {
    stockNo: formData.stockNo,
  }
  return xhr({
    method: 'get',
    url: 'twstock/price',
    params,
  })
    .then(res => res)
    .catch(() => ({ date: [], price: [] }))
}

export const getTwstockMerchantService = (formData) => {
  const time = new Date()
  const params = {
    stockNo: formData.stockNo,
    time: time.getTime(),
  }
  return xhr({
    method: 'get',
    url: 'twstock/merchant',
    params,
  })
    .then(res => res)
    .catch(() => ({ stock: { buy: [], sell: [] }, odd: { buy: [], sell: [] } }))
}

export const getTwstockIncomeService = (formData) => {
  const params = {
    stockNo: formData.stockNo,
  }
  return xhr({
    method: 'get',
    url: 'twstock/income',
    params,
  })
    .then(res => res)
    .catch(() => ({ month: [], income: [] }))
}

export const getTwstockEpsService = (formData) => {
  const params = {
    stockNo: formData.stockNo,
  }
  return xhr({
    method: 'get',
    url: 'twstock/eps',
    params,
  })
    .then(res => res)
    .catch(() => ({ season: [], eps: [] }))
}
