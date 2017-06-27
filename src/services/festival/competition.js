import { request } from '../../utils'

export async function queryRankList(params) {
  return request('/api/music/works', {
    method: 'get',
    headers: {
      'X-Accept-Version': '4.0',
    },
    data: params,
  })
}
