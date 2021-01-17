import { xhr } from './xhr'

export const getCurrencyExchange = () => {
  return xhr({
    mehtod: 'get',
    url: 'currency/exchange',
  })
    .then(res => res)
    .catch(() => ({ foreign: [], local: [] }))
}
