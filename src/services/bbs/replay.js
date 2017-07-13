import { request } from '../../utils'

export async function addReplay(params) {
  return request('/v2/sendfellowins', {
    method: 'post',
    data: params,
  })
}
