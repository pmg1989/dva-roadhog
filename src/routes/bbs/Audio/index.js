import React, { Component } from 'react'
import { connect } from 'dva'
import $ from 'jquery'
import 'audioplayer'
import './index.less'

class Audio extends Component {

  componentDidMount() {
    $(this.audio).audioPlayer()

    // $('#audioBox .audioplayer-playpause').on('click', function (e) {
    //   const title = $(this).attr('title')
    //   if(title === 'Pause') {
    //     pausePlayva() //播放当前之前，先暂停所有播放
    //   }
    // })
  }

  attachCustomAttributes(domNode) {
    if (domNode) {
      domNode.setAttribute('webkit-playsinline', '')
    }
    this.audio = domNode
  }

  render() {
    const { audio } = this.props.location.query

    return (
      <div id="audioBox">
        <audio
          controls
          playsInline
          width="100%"
          ref={::this.attachCustomAttributes}
        >
          <source src={audio} />
          <source src="/audio.wav" />
        </audio>
      </div>
    )
  }
}

export default connect()(Audio)
