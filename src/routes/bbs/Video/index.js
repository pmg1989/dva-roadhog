import React from 'react'
import { connect } from 'dva'

const Video = ({ location }) => {
  const { video } = location.query

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
