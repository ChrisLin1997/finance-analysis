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
  const indexList = [
    '^GSPC', // S&P 500
    '^DJI', // 道瓊
    '^IXIC', // 納斯達克
    '^SOX', // 費城半導體
    '^VIX', // 恐懼
    '^TWII', // 台指加權
    '^N225', // 日經指數
    '^HSI', // 香港恆生
    '^KS11', // 韓國綜合
    '^FTSE', // 英國綜合
  ]
  const url = CORS + 'https://tw.stock.yahoo.com/_td/api/resource/FinancePartnerService.quote;isFormatted=true;symbols=' + indexList.join(',')
  const options = {
    methods: 'get',
    url,
  }
  return await new Promise((resolve, reject) => {
    axios(options)
      .then(res => {
        console.log(res.data.quoteResponse.result)
        resolve(res)
      })
      .catch(err => {
        console.warn('API錯誤', err)
        reject(err)
      })
  })
}
