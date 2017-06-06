import $ from 'jQuery'
import { Toast } from 'antd-mobile'

window.setWinHeight = function(obj) {
  setTimeout(() => {
    if (document.getElementById) {
      if (obj && !window.opera) {
        if (obj.contentDocument && obj.contentDocument.body.offsetHeight) {
          obj.height = obj.contentDocument.body.offsetHeight
        } else if (obj.Document && obj.Document.body.scrollHeight) {
          obj.height = obj.Document.body.scrollHeight
        }
      }
    }
  }, 100)
}

window.whether = function(obj) {
  if ($(obj)[0].duration == 0 || $(obj)[0].duration == 'undefined') {
    Toast.fail('设备版本太低，不支持播放该视频')
  }
}
