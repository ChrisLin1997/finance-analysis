import { xhr } from './xhr'

export const getGoodsIndexService = () => {
  return xhr({
    mehtod: 'get',
    url: 'goods/index',
    defaultData: { data: [] },
  })
}
