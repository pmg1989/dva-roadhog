
const hostname = location.hostname

function getEnv() {
  return ['localhost',
          '0.0.0.0',
          '127.0.0.1',
          '192.168.1.148',
          'test.newband.com'
         ].indexOf(hostname) > -1
}

function getBaseURL() {
  if(getEnv()) {
    return 'http://ec2-54-223-130-122.cn-north-1.compute.amazonaws.com.cn:81'
  }
  return 'https://api.students.newband.com'
}

export default  {
  logoSrc: 'https://o9u2lnvze.qnssl.com/web/global/brand.png',
  baseURL: getBaseURL(),
  env: getEnv() ? 'pro' : 'staging',
  refreshTime: getEnv() ? 300 : 100
}
