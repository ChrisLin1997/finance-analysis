import { xhr } from './xhr'

export const getGoogleNewsService = async (formData) => {
  const params = {
    type: formData.type,
  }
  return await xhr({
    method: 'get',
    url: 'info/googleNews',
    params,
  })
    .then(res => res)
    .catch(() => [])
}

export const getPttService = async () => {
  return await xhr({
    method: 'get',
    url: 'info/ptt',
  })
    .then(res => res)
    .catch(() => [])
}
