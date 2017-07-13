import React, { Component } from 'react'
import { Button } from 'antd-mobile'
// import $ from 'jQuery'
import { renderContent, queryString } from 'utils/tools'
import { showMenu, hideMenu } from 'utils/app'
import styles from './Editable.less'
import './MenuTool'

let timeout

class Editable extends Component {

  state = {
    isDebug: false,
  }

  handleFocus() {
    saveRange()
    if (queryString('debug') === '1') {
      timeout && clearTimeout(timeout)
      this.setState({ isDebug: true })
    } else {
      showMenu()
    }
  }

  handleBlur() {
    saveRange()
    if (queryString('debug') === '1') {
      timeout = setTimeout(() => this.setState({ isDebug: false }), 2000)
    } else {
      hideMenu()
    }
  }

  render() {
    // showMenu()
    const { content } = this.props
    const { isDebug } = this.state

    return (
      <div>
        <div
          id="editable"
          className={styles.editable}
          contentEditable
          onClick={::this.handleFocus}
          onFocus={::this.handleFocus}
          onBlur={::this.handleBlur}
          dangerouslySetInnerHTML={{ __html: renderContent(content) }}
        />
        {isDebug &&
        <div className={styles.opt_box}>
          <Button inline size="small" onClick={() => setImg('//o9u2lnvze.qnssl.com/practice_song_cover96a3fc4a-0bbc-4d82-a66d-31f0704ac06d.png')}>图片</Button>
          <Button inline size="small" onClick={() => setVideo('//o9u2lnvze.qnssl.com/music/practice-songs/d30AANhe9rtPf8gU-f5974e8d-62a6-47dc-90e5-0c85d3dfec19')}>视频</Button>
          <Button inline size="small" onClick={() => setAudio('//o9u2lnvze.qnssl.com//practice_songae40b290-7a28-4034-82a9-2b93b1e35448.mp3')}>语音</Button>
          <Button inline size="small">表情</Button>
          <Button inline size="small">话题</Button>
          <Button inline size="small">位置</Button>
        </div>}
      </div>
    )
  }
}

export default Editable
