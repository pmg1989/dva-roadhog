import { request } from '../../utils'

export async function getMoreReplay(params) {
  return request('/v2/getfellows-two', {
    method: 'get',
    data: params,
  })
}
