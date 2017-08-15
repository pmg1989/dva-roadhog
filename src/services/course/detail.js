import { request } from 'utils'

export async function getDetail(id, params, isShare) {
  return request(isShare ? `/v2/course/${id}` : `/v2/course/${id}`, {
    method: 'get',
    data: params,
  })
}

export async function getRecommend(params, isShare) {
  return request(isShare ? '/v2/course-search' : '/v2/course-search', {
    method: 'get',
    data: params,
  })
}
