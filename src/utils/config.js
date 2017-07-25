
const hostname = location.hostname

function getEnv() {
  if (['bbs.newband.com'].indexOf(hostname) > -1) {
    return 'production'
  }
  if (['staging.app.newband.com'].indexOf(hostname) > -1) {
    return 'staging'
  }
  if (['localhost', '192.168.1.148', 'test.newband.com'].indexOf(hostname) > -1) {
    return 'office'
  }
  return 'staging'
}

function isProduction() {
  return getEnv() === 'production'
}

function getBaseURL() {
  if (isProduction()) {
    return '//api.students.newband.com'
  }
  return '//ec2-54-223-130-122.cn-north-1.compute.amazonaws.com.cn:81'
}

function getBaseShare() {
  if (isProduction()) {
    return '//galaxyapi.newband.com/api/v1/social/wxcfg'
  }
  return '//staging.web.newband.com:5000/api/v1/social/wxcfg'
}

export default {
  baseURL: getBaseURL(),
  baseShare: getBaseShare(),
  env: getEnv(),
  refreshTime: isProduction() ? 150 : 300,
  defaultImage: '//o9u2lnvze.qnssl.com/appbanner/3bec92be7ea938384408d207cb27c338.png',
  dicCategory: {
    1: 2, // 键盘
    2: 3, // 吉他
    3: 1, // 声乐
    4: 5, // 贝斯
    5: 4, // 爵士鼓
  },
}
