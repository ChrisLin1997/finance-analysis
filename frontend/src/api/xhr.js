import axios from 'axios'
import { apiUrl } from '../config'

export const xhr = (options) => {
  options.url = apiUrl + options.url

  return new Promise((resolve, reject) => {
    axios(options)
      .then(res => resolve(res.data))
      .catch(err => reject(err))
  })
}

export const test = async (formData) => {
  const url = 'https://cors-anywhere.herokuapp.com/https://quality.data.gov.tw/dq_download_json.php?nid=18420&md5_url=cfee038a8a9009bf31df7b23328dcc3f'
  const options = {
    methods: 'get',
    url,
    headers: {
      origin: 'http://www.twse.com.tw',
    },
  }
  return await new Promise((resolve, reject) => {
    axios(options)
      .then(res => {
        console.log(res)
        resolve(res)
      })
      .catch(err => {
        console.warn('API錯誤', err)
        reject(err)
      })
  })
}
