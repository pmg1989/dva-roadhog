import { request } from '../../utils'

export async function getDetail(id, params) {
  return request(`/v2/bbssend/${id}`, {
    method: 'get',
    data: params,
  })
}
