import { Toast } from 'antd-mobile'
import Editable from './Editable'

let iframeId = 1

function appendContent(str) {
  const html = document.querySelector('#editable').innerHTML
  document.querySelector('#editable').innerHTML = `${html}${str}`
}

function insertContent(str) {
  let selection,
    range = window._range
  if (!window.getSelection) {
    range.pasteHTML(str)
    range.collapse(false)
    range.select()
  } else {
    if(!range) {
      return false
    }
    selection = window.getSelection ? window.getSelection() : document.selection
    range.collapse(false)
    const hasR = range.createContextualFragment(str)
    let hasR_lastChild = hasR.lastChild
    while (hasR_lastChild && hasR_lastChild.nodeName.toLowerCase() === 'br' && hasR_lastChild.previousSibling && hasR_lastChild.previousSibling.nodeName.toLowerCase() === 'br') {
      const e = hasR_lastChild
      hasR_lastChild = hasR_lastChild.previousSibling
      hasR.removeChild(e)
    }
    range.insertNode(hasR)
    if (hasR_lastChild) {
      range.setEndAfter(hasR_lastChild)
      range.setStartAfter(hasR_lastChild)
    }
    selection.removeAllRanges()
  }
}

//替换表情字符串
function replace_em(str) {
  str = str.replace(/\</g, '&lt;')
  str = str.replace(/\>/g, '&gt;')
  str = str.replace(/\n/g, '<br/>')
  str = str.replace(/\[em_([0-9]*)\]/g, '<img src="/arclist/$1.gif" style="width:initial" border="0" />')
  return str
}

//设置表情包高度
window.keyboardheight = function (percent){
  document.querySelector('#faceBoxInner').style.height = `${window.screen.height * percent - 20}px`
}
// 图片返回
window.setImg = function(str) {
  const imgLength = document.querySelectorAll('#editable img[name="bigimg"]').length
  const srcList = str.split(',')
  if (imgLength + srcList.length > 9) {
    Toast.fail('所选图片和现有图片不能超过9个！', 3)
    return false
  }
  const imgList = srcList.map(src => (
    `<img src="${src}" alt="${src}" class="bigimg" name="bigimg" width="100%" />`
  ))
  // appendContent(imgList.join(''))
  insertContent(imgList.join(''))
  Editable.emitChange()
}
// 返回视频
window.setVideo = function(str) {
  if(document.querySelectorAll('#editable iframe[name="video"]').length >= 3) {
		Toast.fail("视频不能超过3个！", 3)
		return false
	}
  if(document.querySelector('#editable').innerHTML.length === 0) {
		insertContent('<br/>')
	}
  insertContent(`<iframe id="iframe_${iframeId}" onLoad="iFrameHeight('iframe_${iframeId}')" src="/video.html?video=${str}" name="video" width="100%" frameborder="0"></iframe>`)
  iframeId++
  Editable.emitChange()
}
// 返回录音
window.setAudio = function(str) {
  if(document.querySelectorAll('#editable iframe[name="audio"]').length >= 3) {
		Toast.fail("音频不能超过3个！", 3)
		return false
	}
  if(document.querySelector('#editable').innerHTML.length === 0) {
		insertContent('<br/>')
	}
  insertContent(`<iframe width="100%" height="40" frameborder="0" name="audio" src="/audio.html?audio=${str}"></iframe>`);
  Editable.emitChange()
}
// 返回地理位置
window.setAddress = function(str) {
  let addr = { place: '', latitude: '', longitude: '' }
  if(!!str.length) {
    const strArr = str.split(',')
    if(strArr.length === 3) {
      addr = { place: strArr[0], latitude: strArr[1], longitude: strArr[2] }
    }
  }
  Editable.emitSetAddress(addr)
}
// 显示表情包
window.setFace = function(str) {
  document.querySelector('#faceBox').style.display = 'block'
}
// 收起表情包
window.faceHide = function() {
  document.querySelector('#faceBox').style.display = 'none'
}
// 设置表情
window.setFaceQQ = function(str) {
  insertContent(replace_em(str))
  Editable.emitChange()
}
// 保存光标位置
window.saveRange = function() {
  const selection = window.getSelection ? window.getSelection() : document.selection
  if (!selection.rangeCount) {
    return
  }
  const range = selection.createRange ? selection.createRange().htmlText : selection.getRangeAt(0)
  window._range = range
}
