import { xhr } from './xhr'

export const getVirtualIndexService = () => {
  return xhr({
    mehtod: 'get',
    url: 'virtual/index',
  })
    .then(res => res)
    .catch(() => [])
}
