import { stringify, parse } from 'qs'

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

function isIOS() {
  return /NB-GENERAL-IOS/i.test(navigator.userAgent) ? true : false
}

function isAndroid() {
  return /NB-GENERAL-AND/i.test(navigator.userAgent) ? true : false
}

function isApp() {
  return isIOS() || isAndroid()
}

function getAppVersion() {
    var val = /\[NB\](.*?)\[\!NB\]/.exec(navigator.userAgent)
    if (val && val.length > 1) {
        val = JSON.parse(val[1])
        return +val.VERSION.replace(/\./g, '')
    }
    return 0
}

function appRedirect(e) {
  if(isApp()) {
    e.preventDefault()
    location.href = e.currentTarget.href
  }
}

// 获取分类ID图片
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

// 获取发布BBS距离当前的时间
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
  const yearC = diffValue / year
  const monthC = diffValue / month
  const weekC = diffValue / (7 * day)
  const dayC = diffValue / day
  const hourC = diffValue / hour
  const minC = diffValue / minute

  const time = new Date(timeSpan)
  const y = time.getFullYear()
  const m = time.getMonth() + 1
  const d = time.getDate()

  if (monthC >= 1) {
 		result = (`${y}-${m}-${d}`)
  } else if (weekC >= 1) {
 		result = `${parseInt(weekC)}周前`
  } else if (dayC >= 1) {
 		result = `${parseInt(dayC)}天前`
  } else if (hourC >= 1) {
 		result = `${parseInt(hourC)}小时前`
  } else if (minC >= 1) {
 		result = `${parseInt(minC)}分钟前`
  } else {
    result = '刚刚'
  }

  return result
}

// 点赞/评论数
function renderTimes(times) {
  if (times > 999) {
    return '+999'
  } else if (times > 0) {
    return times
  }
  return ''
}

// 详情内容过滤
function renderContent(content) {
  if (content) {
  	content = content.replace(/http:\/\//g, '//') // 替换资源文件 https:// http:// => //
    content = content.replace(/"arclist\//g, '"/arclist/') // 替换表情包 arclist/ => /arclist/
  }
  return content
}

// 列表内容摘要过滤
function renderAbstract(content) {
  content = removeHTMLTag(content)
  if (content.length > 50) {
    content = `${content.substring(0, 50)}...`
  }
  return content
}

// 列表处理音视频图片显示
function renderIva(content) {
  content = renderContent(content)
  const iframe = content.match(/<iframe[^>]+>/g)
  const srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i

  let videoSrc = ''
  let audioStr = ''

  if (iframe) {
    for (let i = 0; i < iframe.length; k++) {
      const iframelabel = iframe[i]
      if (iframelabel.indexOf('name="video"') !== -1) {
        const src = iframelabel.match(srcReg)
        videoSrc = src[1].split('video=')[1]
        break
      } else if (iframelabel.indexOf('name="audio"') !== -1) {
        audioStr = iframelabel
        break
      }
    }

    if (videoSrc) {
      return (
        `<div class='video_box'>
           <video
            controls=''
            playsinline=''
            webkit-playsinline=''
            width='100%'
            preload='none'
            onclick='videoPlay(this)'
            poster='${videoSrc}?vframe/jpg/offset/0' >
              <source src='${videoSrc}' type='video/mp4' />
           </video>
            <!--<i class="play_icon" onclick='videoPlayH5(this)' />-->
         </div>`
      )
    }
  }

  let imgList = content.match(/<img[^>]+>/g)
  const imageMogr = '?imageMogr2/thumbnail/640x/format/jpg/interlace/1/blur/1x0/quality/75|imageslim'

  if (imgList) {
    imgList = imgList.filter(img => img.indexOf('width:initial') === -1)
    if (imgList.length > 9) {
      imgList = imgList.filter((img, index) => index < 9)
    }
    const imgLength = imgList.length

    if (imgLength) {
      imgList = imgList.map(img => (
        `<div class='item item_${imgLength}' style="background: url('${img.match(srcReg)[1]}${imageMogr}') no-repeat center center;background-size: cover;">
         </div>`
      ))

      return `<div class="img_list">${imgList.join('')}</div>`
    }
  }

  return audioStr
}

function renderUserName(userName) {
  return userName.length > 8 ? `${userName.substr(0, 8)}...` : userName
}

// 去除html标签取内容
function removeHTMLTag(str) {
  str = str.replace(/<\/?[^>]*>/g, '')      // 去除HTML tag
  str = str.replace(/[ | ]*\n/g, '\n')      // 去除行尾空白
  str = str.replace(/\n[\s| | ]*\r/g, '\n') // 去除多余空行
  str = str.replace(/ /ig, '')                // 去掉
  return str
}

// 日期格式化
Date.prototype.format = function(format) {
  const o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'H+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds(),
  }
  if (/(y+)/.test(format)) { format = format.replace(RegExp.$1, (`${this.getFullYear()}`).substr(4 - RegExp.$1.length)) }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1
        ? o[k]
        : (`00${o[k]}`).substr((`${o[k]}`).length))
    }
  }
  return format
}

// 跳转至登录页面
function redirectToLogin() {
  const query = parse(location.search.substr(1))
  if(query.token) {
    delete query.token
  }
  const url = !!stringify(query) ? `${location.pathname}?${stringify(query)}` : location.pathname
  location.href = `/login?url=${url}`
}

//http => https 头像 / 等资源替换
function replaceHostName(url = '') {
  return url.replace(/http:\/\/7u2jck.com2.z0.glb.qiniucdn.com/g, '//o9u2lnvze.qnssl.com')
}

//秒 => 分：秒
function renderDuratiton(duration) {
  const min = Math.floor(duration / 60)
  const sec = duration % 60
  return `${min > 10 ? min : ('0' + min)}:${sec}`
}

function renderThumbs(src, width, height, type = 1) {
  const ext = `imageView2/${type}/w/${width}/h/${height}`
  return src.indexOf('?') > -1 ? `${src}&${ext}` : `${src}?${ext}`
}

export default {
  queryString,
  isIOS: isIOS(),
  isAndroid: isAndroid(),
  isApp: isApp(),
  appRedirect,
  getCategoryImage,
  renderDate,
  renderTimes,
  renderContent,
  renderAbstract,
  renderIva,
  renderUserName,
  removeHTMLTag,
  redirectToLogin,
  replaceHostName,
  renderDuratiton,
  renderThumbs,
}
