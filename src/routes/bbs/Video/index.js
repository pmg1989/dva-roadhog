import React from 'react'
import { connect } from 'dva'
import { Toast } from 'antd-mobile'
// import $ from 'jQuery'

window.whether = function(obj) {
  // if ($(obj)[0].duration === 0 || $(obj)[0].duration === 'undefined') {
  //   Toast.fail('设备版本太低，不支持播放该视频')
  // }
}

const Video = ({ location, src }) => {
  let video = src
  if(location && location.query) {
    video = location.query.video
  }

  function attachCustomAttributes(domNode) {
    if (domNode) {
      domNode.setAttribute('webkit-playsinline', '')
      domNode.setAttribute('onloadedmetadata', 'whether(this)')
    }
  }

  return (
    <video
      controls
      playsInline
      width="100%"
      preload="none"
      ref={attachCustomAttributes}
      poster={`${video}?vframe/jpg/offset/0`}
    >
      <source src={video} type="video/mp4" />
    </video>
  )
}

export default connect()(Video)
