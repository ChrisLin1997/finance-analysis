import axios from 'axios'
import { apiUrl, CORS } from '../config'

export const xhr = (options) => {
  options.url = apiUrl + options.url
  if (process.env.NODE_ENV === 'devement') {
    options.headers['Access-Control-Allow-Origin'] = '*'
  }

  return new Promise((resolve, reject) => {
    axios(options)
      .then(res => resolve(res.data))
      .catch(err => reject(err))
  })
}

export const test = async () => {
  const data = {
    filter: [
      { left: 'market_cap_calc', operation: 'nempty' },
      { left: 'sector', operation: 'nempty' },
      { left: 'name', operation: 'match', right: 'USD$' }],
    options: {
      lang: 'zh_TW',
    },
    symbols: {
      query: { types: [] },
      tickers: [],
    },
    columns: ['base_currency_logoid', 'sector', 'close', 'change'],
    sort: { sortBy: 'market_cap_calc', sortOrder: 'desc' },
    range: [0, 10],
  }

  const url = CORS + 'https://scanner.tradingview.com/crypto/scan'
  const options = {
    methods: 'get',
    url,
    data,
  }
  return await new Promise((resolve, reject) => {
    axios(options)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        console.warn('API錯誤', err)
        reject(err)
      })
  })
}
