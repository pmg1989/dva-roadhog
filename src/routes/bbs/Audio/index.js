import React from 'react'
import { connect } from 'dva'
import $ from 'jQuery'
import 'audioplayer'
import './index.less'

$(() => {
  setTimeout(() => {
    $('#audioBox audio').audioPlayer()
  }, 0)
})

const Audio = ({ location }) => {
  const { audio } = location.query

  function attachCustomAttributes(domNode) {
    if (domNode) {
      domNode.setAttribute('webkit-playsinline', '')
    }
  }

  return (
    <div id="audioBox">
      <audio
        controls
        playsInline
        width="100%"
        ref={attachCustomAttributes}
      >
        <source src={audio} />
        <source src="/audio.wav" />
      </audio>
    </div>
  )
}

export default connect()(Audio)
