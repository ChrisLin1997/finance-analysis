import { xhr } from './xhr'

export const getStockChartService = async (formData) => {
  const options = {
    method: 'get',
    url: 'https://api.fugle.tw/realtime/v0/intraday/chart',
    params: {
      symbolId: formData.symbolId,
      oddLot: formData.oddLot,
    },
  }
  return await xhr(options)
}
