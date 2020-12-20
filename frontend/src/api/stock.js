import { xhr } from './xhr'

export const getStockChartService = async (formData) => {
  const options = {
    method: 'get',
    url: 'stock/info',
  }
  return await xhr(options)
}
