import axios from 'axios'
import { Toast } from 'antd-mobile'
import { stringify } from 'qs'
import NProgress from 'nprogress'
import { queryString } from './utils'

axios.defaults.baseURL = 'http://ec2-54-223-130-122.cn-north-1.compute.amazonaws.com.cn:81'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
axios.defaults.headers.common['X-Accept-Version'] = '3.7'

const fetch = (url, options) => {
  const { method = 'get', data, headers } = options
  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, { params: data, headers })
    case 'delete':
      return axios.delete(url, { data, headers })
    case 'head':
      return axios.head(url, data, { headers })
    case 'post':
      if (headers) {
        return axios.post(url, stringify(data), { headers })
      } else {
        return axios.post(url, stringify(data))
      }
    case 'put':
      return axios.put(url, stringify(data), { headers })
    case 'patch':
      return axios.patch(url, data, { headers })
    default:
      return axios(options)
  }
}

function checkStatus(res) {
  if (res.status >= 200 && res.status < 300) {
    return res
  }
}

function handelData(res) {
  NProgress.done()
  const data = res.data
  if (data && data.message !== 'Success') {
    Toast.fail(data.msg, 1)
    return { success: false }
  }
  // else if(data && data.msg && data.success) {
  //   message.success(data.msg)
  // }
  return { ...data.data, success: true }
}

function handleError(error) {
  NProgress.done()
  const data = error.response.data
  if (data.errors) {
    Toast.fail(`${data.message}：${data.errors}`, 1)
  } else if (data.error) {
    Toast.fail(`${data.error}：${data.error_description}`, 1)
    if (data.error === 'invalid_grant') {
      console.log('invalid_grant')
    }
  } else {
    Toast.fail('未知错误！', 1)
  }
  return { success: false }
}

export default function request(url, options) {
  const urlToken = `${url}?access_token=${queryString('token')}`
  NProgress.start()
  return fetch(urlToken, options)
        .then(checkStatus)
        .then(handelData)
        .catch(handleError)
}

export function get(url, options) {
  return request(url, { ...options, method: 'get' })
}

export function post(url, options) {
  return request(url, { ...options, method: 'post' })
}

export function put(url, options) {
  return request(url, { ...options, method: 'put' })
}

export function deleted(url, options) {
  return request(url, { ...options, method: 'deleted' })
}
