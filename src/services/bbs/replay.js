import { request } from '../../utils'

export async function addReplay(params) {
  return request('v2/sendins', {
    method: 'post',
    data: params,
  })
}
