import { request } from '../../utils'

export async function getCategory(params) {
  return request('/api/bbs/categories', {
    method: 'get',
    headers: {
      'X-Accept-Version': '3.7'
    },
    data: params,
  })
}

export async function getList(params) {
  return request('/api/bbs/posts', {
    method: 'get',
    headers: {
      'X-Accept-Version': '3.7'
    },
    data: params,
  })
}
