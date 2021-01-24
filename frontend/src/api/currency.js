import { xhr } from './xhr'

export const getCurrencyIndexService = () => {
  return xhr({
    mehtod: 'get',
    url: 'currency/index',
  })
    .then(res => res)
    .catch(() => ({ foreign: [], local: [] }))
}
