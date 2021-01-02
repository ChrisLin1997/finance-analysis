import { xhr } from './xhr'

export const getTwstockHotService = async () => {
  return await xhr({
    method: 'get',
    url: 'twstock/hot',
  })
    .then(res => res)
    .catch(() => {
      const err = {
        data: [],
        date: '',
      }
      return err
    })
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
    .catch(() => {
      const err = {}
      return err
    })
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
    .catch(() => {
      const err = { buy: [], sell: [] }
      return err
    })
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
    .catch(() => {
      const err = { month: [], income: [] }
      return err
    })
}
