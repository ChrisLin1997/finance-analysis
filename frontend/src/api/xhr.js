import axios from 'axios'
import { apiUrl } from '../config'

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
  const params = {
    stockNo: '2330.TW',
  }
  const url = apiUrl + 'usstock/info'
  const options = {
    methods: 'get',
    url,
    params,
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
