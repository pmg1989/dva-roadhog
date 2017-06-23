import React, { Component } from 'react'
import Lyrics from './Lyrics'
import './AudioPlayer.less'

class AudioPlayer extends Component {
  // constructor() {
  //
  // }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <Lyrics url={'https://o9u2lnvze.qnssl.com//competition5a1e4747-2e3e-48ba-bba8-8b08b462d9c8.lrc'} />
        {/* <Lyrics url={'https://o9u2lnvze.qnssl.com//practice_song6a3745d8-fb66-4342-a5a4-a27b4d546f4b.lrc'} /> */}
        <audio style={{ width: '100%' }}
          id="audio"
          controls
          playsInline
          src="/demo/tai_zao.mp3"
        >!audio not supported :(
        </audio>
      </div>
    )
  }
}

export default AudioPlayer
