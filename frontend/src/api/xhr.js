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

export const test = async (formData) => {
  const url = 'https://cors-anywhere.herokuapp.com/http://mis.twse.com.tw/stock/api/getStockInfo.jsp'
  const params = {
    ex_ch: formData.stockId,
    time: formData.time,
  }
  const options = {
    methods: 'get',
    url,
    params,
    headers: {
      origin: 'http://mis.twse.com.tw',
    },
  }
  return await new Promise((resolve, reject) => {
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
