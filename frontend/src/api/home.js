import { xhr } from './xhr'

export const getGoogleNewsService = (formData) => {
  const params = {
    type: formData.type,
  }
  return xhr({
    method: 'get',
    url: 'home/googleNews',
    params,
  })
    .then(res => res)
    .catch(() => [])
}

export const getPttService = () => {
  return xhr({
    method: 'get',
    url: 'home/ptt',
  })
    .then(res => res)
    .catch(() => [])
}

export const getMajorIndexService = () => {
  return xhr({
    method: 'get',
    url: 'home/index',
  })
    .then(res => res)
    .catch(() => [])
}
