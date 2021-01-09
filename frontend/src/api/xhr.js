import axios from 'axios'
import { apiUrl, CORS } from '../config'

export const xhr = (options) => {
  options.url = apiUrl + options.url

  return new Promise((resolve, reject) => {
    axios(options)
      .then(res => resolve(res.data))
      .catch(err => reject(err))
  })
}

export const test = async () => {
  const url = CORS + 'https://www.wantgoo.com/stock/2330/financial-statements/monthly-revenue'
  const options = {
    methods: 'get',
    url,
  }
  return await new Promise((resolve, reject) => {
    axios(options)
      .then(res => {
        console.log(res.data)
        resolve(res)
      })
      .catch(err => {
        console.warn('API錯誤', err)
        reject(err)
      })
  })
}
