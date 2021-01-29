import { xhr } from './xhr'

export const getVirtualIndexService = () => {
  return xhr({
    mehtod: 'get',
    url: 'virtual/index',
    defaultData: [],
  })
}
