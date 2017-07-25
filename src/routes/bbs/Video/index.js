import React from 'react'
import { connect } from 'dva'
import { Toast } from 'antd-mobile'
import { isApp } from 'utils/tools'
import './index.less'

window.whether = function(obj) {
  // if ($(obj)[0].duration === 0 || $(obj)[0].duration === 'undefined') {
  //   Toast.fail('设备版本太低，不支持播放该视频')
  // }
}

const Video = ({ location, src, cover }) => {
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

  function handleVideoPlay(e) {
    if(isApp) {
      videoPlay(e.target)
    } else {
      videoPlayH5(e.target)
    }
  }

  return (
    <div className='video_box'>
      <video
        controls
        playsInline
        width="100%"
        preload="none"
        onClick={handleVideoPlay}
        ref={attachCustomAttributes}
        poster={!!cover ? cover : `${video}?vframe/jpg/offset/0`}
      >
        <source src={video} type="video/mp4" />
      </video>
      {!isApp && <i className="play_icon" onClick={handleVideoPlay} />}
    </div>
  )
}

export default connect()(Video)
