import { request } from '../../utils'

export async function like(params) {
  return request('/v2/sendagree', {
    method: 'post',
    data: params,
  })
}

export async function unlike(params) {
  return request('/v2/sendagreedel', {
    method: 'post',
    data: params,
  })
}
