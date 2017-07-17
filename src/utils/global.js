window.setWinHeight = function(obj) {
  if (document.getElementById) {
    if (obj && !window.opera) {
      if (obj.contentDocument && obj.contentDocument.body.offsetHeight) {
        obj.height = obj.contentDocument.body.offsetHeight + 2
      } else if (obj.Document && obj.Document.body.scrollHeight) {
        obj.height = obj.Document.body.scrollHeight
      }
    }
  }
}

window.iFrameHeight = function(id) {
  const ifm = document.getElementById(id)
  const subWeb = document.frames ? document.frames[id].document : ifm.contentDocument
  if(ifm != null && subWeb != null) {
    ifm.height = subWeb.body.clientHeight + 5
  }
}

//下载页面跳转
window.goToDownLoad = function (params) {
  if(params) {

  } else {
    window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.newband'
  }
}

//列表页视频点击事件
window.videoPlay = function(el) {
  event.stopPropagation()
  let player = el
  let icon = el.nextElementSibling
  if(el.tagName !== 'VIDEO') {
    player = el.previousElementSibling
    icon = el
  }
  if(player.paused) {
    player.play()
    icon.style.display = 'none'
  } else {
    player.pause()
    icon.style.display = 'block'
  }
}
