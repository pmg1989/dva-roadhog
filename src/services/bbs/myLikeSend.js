import { request } from '../../utils'

export async function getList(params) {
  return request('/v2/send', {
    method: 'get',
    data: params,
  })
}
