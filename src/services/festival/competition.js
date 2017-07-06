import { request } from '../../utils'

export async function get(params, isShare) {
  return request(isShare ? '/api/share/competition' : '/api/music/competition', {
    method: 'get',
    headers: {
      'X-Accept-Version': '4.0',
    },
    data: params,
  })
}

export async function queryRankList(params, isShare) {
  return request(isShare ? '/api/share/competition-works' : '/api/music/works', {
    method: 'get',
    headers: {
      'X-Accept-Version': '4.0',
    },
    data: params,
  })
}
