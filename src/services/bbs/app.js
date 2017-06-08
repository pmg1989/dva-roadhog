import { request } from '../../utils'

export async function getUser(params) {
  return request('/v2/user', {
    method: 'get',
    data: params,
  })
}
