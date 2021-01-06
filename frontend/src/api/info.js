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
    .catch(() => {
      return []
    })
}

export const getPttService = async () => {

}
