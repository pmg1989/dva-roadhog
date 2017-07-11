import { request } from '../../utils'

export async function addSend(params) {
  return request('v2/sendins', {
    method: 'post',
    data: params,
  })
}
