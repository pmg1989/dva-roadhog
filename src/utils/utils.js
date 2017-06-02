// 根据key获取url中的参数
function queryString(value) {
  const reg = new RegExp(`(^|&)${value}=([^&]*)(&|$)`, 'i')
  const r = location.search.substr(1).match(reg)
  if (r != null) {
    return unescape(r[2])
  } else {
    return null
  }
}

function getCategoryImage(cid) {
  const dic = {
    1: 'https://o9u2lnvze.qnssl.com/upload/bcef7efd6fd47892dd275f7e9da49ed6.png?1495444468',
    2: 'https://o9u2lnvze.qnssl.com/upload/06875ce23ee294f07c760715093c4dbe.png?1495444468',
    3: 'https://o9u2lnvze.qnssl.com/upload/599f44feb33e6ef97b00efc2cea28e41.png?1495444468',
    4: 'https://o9u2lnvze.qnssl.com/upload/efbd8b7ece8a68d337859b09eccd3cfb.png?1495444468',
    5: 'https://o9u2lnvze.qnssl.com/upload/f7348350929b42d92a2423a42b7486f7.png?1495444468',
    6: 'https://o9u2lnvze.qnssl.com/upload/064663bb1d571cf2696161e656e56714.png?1495444468',
    7: 'https://o9u2lnvze.qnssl.com/upload/18302cda6f6207d9aa584f09910ba324.png?1495445293',
    '6,12': 'https://o9u2lnvze.qnssl.com/upload/064663bb1d571cf2696161e656e56714.png?1495444468',
  }

  return dic[cid] || dic[6]
}

export default {
  queryString,
  getCategoryImage,
}
