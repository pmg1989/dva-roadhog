import { request } from '../../utils'

export async function getWork(id, share) {
  return request(share ? `/api/share/practice-work/${id}` : `/api/music/song/${id}`, {
    method: 'get',
    headers: {
      'X-Accept-Version': '4.0',
    },
  })
}

export async function getReplayList(params, share) {
  const url = share ? '/v2/share-getfellows-one' : '/v2/getfellows-one'
  return request(url, {
    method: 'get',
    data: params,
  })
}
