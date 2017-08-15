import { request } from 'utils'

export async function getUser(id, isShare) {
  return request(isShare ? `/v2/user/${id}` : `/v2/user/${id}`, {
    method: 'get',
    data: {},
  })
}

export async function getCourse(id, params, isShare) {
  return request(isShare ? `/v2/user/${id}/courses` : `/v2/user/${id}/courses`, {
    method: 'get',
    data: params,
  })
}

export async function getActivities(id, params, isShare) {
  return request(isShare ? `/api/user/${id}/activities` : `/api/user/${id}/activities`, {
    method: 'get',
    headers: {
      'X-Accept-Version': '4.1',
    },
    data: params,
  })
}
