import axios from 'axios'
import { apiUrl, CORS } from '../config'

export const xhr = (options) => {
  options.url = apiUrl + options.url
  if (process.env.NODE_ENV === 'devement') {
    options.headers['Access-Control-Allow-Origin'] = '*'
  }

  return axios(options)
    .then(res => res.data)
    .catch(err => {
      console.log(err)
      return options.defaultData
    })
}

export const test = async () => {
  const url = CORS + 'https://scanner.tradingview.com/crypto/scan'
  const options = {
    methods: 'get',
    url,
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
