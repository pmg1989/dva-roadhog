import { request } from '../../utils'

export async function query(params) {
  return request('/api/bbs/categories', {
    method: 'get',
    data: params,
  })
}
