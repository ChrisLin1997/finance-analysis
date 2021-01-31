import { xhr } from './xhr'

export const getTwstockInfoService = (formData) => {
  const params = {
    stockNo: formData.stockNo,
  }
  return xhr({
    method: 'get',
    url: 'twstock/info',
    params,
    defaultData: {},
  })
}

export const getTwstockPriceService = (formData) => {
  const params = {
    stockNo: formData.stockNo,
  }
  return xhr({
    method: 'get',
    url: 'twstock/price',
    params,
    defaultData: { date: [], price: [] },
  })
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
    defaultData: { stock: { buy: [], sell: [] }, odd: { buy: [], sell: [] } },
  })
}

export const getTwstockIncomeService = (formData) => {
  const params = {
    stockNo: formData.stockNo,
  }
  return xhr({
    method: 'get',
    url: 'twstock/income',
    params,
    defaultData: { month: [], income: [] },
  })
}

export const getTwstockEpsService = (formData) => {
  const params = {
    stockNo: formData.stockNo,
  }
  return xhr({
    method: 'get',
    url: 'twstock/eps',
    params,
    defaultData: { season: [], eps: [] },
  })
}
