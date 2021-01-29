import { xhr } from './xhr'

export const getCurrencyIndexService = () => {
  return xhr({
    mehtod: 'get',
    url: 'currency/index',
    defaultData: { foreign: [], local: [] },
  })
}
