import { isApp } from 'utils/tools'

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
    window.location.href = '//a.app.qq.com/o/simple.jsp?pkgname=com.newband'
  }
}

//html5页视频点击事件
window.videoPlayH5 = function(el) {
  event.stopPropagation()
  let player = el
  let icon = el.nextElementSibling
  if(el.tagName !== 'VIDEO') {
    player = el.previousElementSibling
    icon = el
  }
  if(player.paused) {
    pausePlayva() //播放当前之前，先暂停所有播放
    player.play()
    icon.style.display = 'none'
  } else {
    player.pause()
    icon.style.display = 'block'
  }
}

//app页视频点击事件
window.videoPlay = function(el) {
  event.stopPropagation()
  let player = el
  if(player.paused) {
    pausePlayva() //播放当前之前，先暂停所有播放
    player.play()
  } else {
    player.pause()
  }
}

//列表页暂停播放音视频
window.pausePlayva = function () {
  const videoList = document.getElementsByTagName('video')
  for (let i = 0; i < videoList.length; i++) {
     if (videoList[i].play) {
       videoList[i].pause()
       if(!isApp) {
          let icon = videoList[i].nextElementSibling
          if(icon) {
            icon.style.display = 'block'
          }
       }
     }
  }
  // const audioList = document.querySelectorAll('iframe[name="audio"]')
  // for (let i = 0; i < audioList.length; i++) {
  //    audioList[i].src = audioList[i].src
  // }
}
