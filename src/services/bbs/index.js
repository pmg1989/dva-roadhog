import { request } from '../../utils'

export async function getCategory(params) {
  return request('/api/bbs/categories', {
    method: 'get',
    data: params,
  })
}

export async function getList(params) {
  return request('/api/bbs/posts', {
    method: 'get',
    data: params,
  })
}
