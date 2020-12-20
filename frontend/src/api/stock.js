import { xhr } from './xhr'

export const getStockInfoService = async (formData) => {
  const params = {
    stockId: formData.stockId,
  }
  return new Promise((resolve, reject) => {
    return xhr({
      method: 'get',
      url: 'stock/info',
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
