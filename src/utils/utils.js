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

//获取分类ID图片
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

//获取发布BBS距离当前的时间
const minute = 1000 * 60
const hour = minute * 60
const day = hour * 24
const halfamonth = day * 15
const month = day * 30
const year = month * 12

function renderDate(timespan) {
  let result
	const timeSpan = timespan * 1000
	const now = new Date().getTime()
	const diffValue = now - timeSpan
  const yearC  = diffValue / year
	const monthC = diffValue / month
	const weekC  = diffValue / (7*day)
	const dayC   = diffValue / day
	const hourC  = diffValue / hour
	const minC   = diffValue / minute

  const time = new Date(timeSpan)
  const y = time.getFullYear()
  const m = time.getMonth() + 1
  const d = time.getDate()

	if(monthC >= 1){
 		result = (y + "-" + m + "-" + d)
	} else if(weekC >= 1){
 		result = parseInt(weekC) + "周前"
	} else if(dayC >= 1){
 		result = parseInt(dayC) +"天前"
	} else if(hourC >= 1){
 		result = parseInt(hourC) +"小时前"
	} else if(minC>=1){
 		result = parseInt(minC) +"分钟前"
	} else {
    result = "刚刚"
  }

	return result
}

//点赞/评论数
function renderTimes(times) {
  if (times > 999) {
    return '+999'
  } else if (times > 0) {
    return times
  }
  return ''
}

//详情内容过滤
function renderContent(content) {
  return content
}

export default {
  queryString,
  getCategoryImage,
  renderDate,
  renderTimes,
  renderContent,
}
