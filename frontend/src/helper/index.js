export const getOpenDay = () => {
  const time = new Date()
  const year = time.getFullYear().toString()
  const month = time.getMonth() + 1 < 10 ? '0' + time.getMonth() + 1 : (time.getMonth() + 1).toString()
  const day = time.getDate() < 10 ? '0' + time.getDate() : time.getDate().toString()
  return year + month + day
}

export const sleep = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, ms);
  })
}