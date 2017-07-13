import React, { Component } from 'react'
import { Button } from 'antd-mobile'
// import $ from 'jQuery'
import { renderContent, queryString } from 'utils/tools'
import { showMenu } from 'utils/app'
import styles from './Editable.less'
import './MenuTool'

class Editable extends Component {

  state = {
    isDebug: false,
  }

  handleFocus() {
    saveRange()
    if (queryString('debug') === '1') {
      this.setState({ isDebug: true })
    } else {
      showMenu()
    }
  }

  handleBlur() {
    if (queryString('debug') === '1') {
      setTimeout(() => this.setState({ isDebug: false }), 2000)
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
          onFocus={::this.handleFocus}
          onBlur={::this.handleBlur}
          dangerouslySetInnerHTML={{ __html: renderContent(content) }}
        />
        {isDebug &&
        <div className={styles.opt_box}>
          <Button inline size="small" onClick={() => setImg('//o9u2lnvze.qnssl.com/practice_song_cover96a3fc4a-0bbc-4d82-a66d-31f0704ac06d.png')}>图片</Button>
          <Button inline size="small">视频</Button>
          <Button inline size="small">语音</Button>
          <Button inline size="small">表情</Button>
          <Button inline size="small">话题</Button>
          <Button inline size="small">位置</Button>
        </div>}
      </div>
    )
  }
}

export default Editable
