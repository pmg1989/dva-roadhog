import { request } from '../../utils'

export async function getWork(id, params) {
  return request(`/api/music/work/${id}`, {
    method: 'get',
    headers: {
      'X-Accept-Version': '4.0',
    },
    data: params,
  })
}
