import { xhr } from './xhr'

export const getGoogleNewsService = (formData) => {
  const params = {
    type: formData.type,
  }

  return xhr({
    method: 'get',
    url: 'home/googleNews',
    params,
    defaultData: [],
  })
}

export const getPttService = () => {
  return xhr({
    method: 'get',
    url: 'home/ptt',
    defaultData: [],
  })
}

export const getMajorIndexService = () => {
  return xhr({
    method: 'get',
    url: 'home/index',
    defaultData: [],
  })
}
