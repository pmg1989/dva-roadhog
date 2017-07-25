import { request } from '../../utils'

export async function getList(userid, params) {
  return request(`/v2/user/${userid}/bbssend`, {
    method: 'get',
    data: params,
  })
}
