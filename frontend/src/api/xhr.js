import axios from 'axios'
import { apiUrl } from '../config'

export const xhr = (options) => {
  options.url = apiUrl + options.url

  return new Promise((resolve, reject) => {
    axios(options)
      .then(res => {
        resolve(res.data.data)
      })
      .catch(err => {
        console.warn('API錯誤', err)
        reject(err)
      })
  })
}
