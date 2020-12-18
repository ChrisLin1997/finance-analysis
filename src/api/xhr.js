import axios from 'axios'

const apiToken = '78d23f123926ac1673a1feb2296f207b'

export const xhr = (options) => {
  options.params.apiToken = apiToken

  return new Promise((resolve, reject) => {
    axios(options)
      .then(res => {
        resolve(res.data.data)
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
  })
}
