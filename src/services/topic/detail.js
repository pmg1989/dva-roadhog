import { request } from 'utils'

export async function getDetail(params, isShare) {
  return request(isShare ? '/v2/share-topic/detail' : '/v2/topic/detail', {
    method: 'get',
    data: params,
  })
}
