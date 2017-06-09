import { request } from '../../utils'

export async function getDetail(id, share, params) {
  const url = share ? `/v2/share-bbssend/${id}` : `/v2/bbssend/${id}`
  return request(url, {
    method: 'get',
    data: params,
  })
}

export async function getReplayList(share, params) {
  const url = share ? '/v2/share-getfellows-one' : '/v2/getfellows-one'
  return request(url, {
    method: 'get',
    data: params,
  })
}

export async function deleteSend(sendId, params) {
  return request(`v2/senddel/${sendId}`, {
    method: 'put',
    data: params,
  })
}
