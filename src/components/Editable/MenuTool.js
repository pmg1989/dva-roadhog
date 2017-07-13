import $ from 'jQuery'
import { Toast } from 'antd-mobile'

let iframeId = 1

function appendContent(str) {
  const html = $('#editable').html()
  $('#editable').html(`${html}${str}`)
}

function insertContent(str) {
  let selection,
    range = window._range
  if (!window.getSelection) {
    range.pasteHTML(str)
    range.collapse(false)
    range.select()
  } else {
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

// 图片返回
window.setImg = function(str) {
  const imgLength = $('#editable img[name="bigimg"]').length
  const srcList = str.split(',')
  if (imgLength + srcList.length > 9) {
    Toast.fail('所选图片和现有图片不能超过9个！', 3)
    return false
  }
  const imgList = srcList.map(src => (
    `<img src=${src} class="bigimg" name="bigimg" width="100%">`
  ))
  // appendContent(imgList.join(''))
  insertContent(imgList.join(''))
}
// 返回视频
window.setVideo = function(str) {
  if($('#editable iframe[name="video"]').length >= 3) {
		Toast.fail("视频不能超过3个！", 3)
		return false
	}
  if($("#editable").html().length === 0) {
		insertContent('<br/>')
	}
  insertContent(`<iframe id="iframe_${iframeId}" onLoad="iFrameHeight('iframe_${iframeId}')" src="/video.html?video=${str}" name="video" width="100%" frameborder="0"></iframe>`)
  iframeId++
}
// 返回录音
window.setAudio = function(str) {
  if($('#editable iframe[name="audio"]').length >= 3) {
		Toast.fail("音频不能超过3个！", 3)
		return false
	}
  if($("#editable").html().length === 0) {
		insertContent('<br/>')
	}
  insertContent(`<iframe width="100%" height="40" frameborder="0" name="audio" src="/audio.html?audio=${str}"></iframe>`);
}
// 返回地理位置
window.setAddress = function(str) {

}
// 设置表情
window.setFace = function(str) {

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
