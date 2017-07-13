import React, { Component } from 'react'
import { Button } from 'antd-mobile'
import { renderContent, renderUserName } from 'utils/tools'
import { showMenu, hideMenu } from 'utils/app'
import FaceQQ from './FaceQQ'
import styles from './Editable.less'
import './MenuTool'

let emitOnChange
let emitOnSetAddress
let faceIsOpen = false

function triggerFace(str) {
  if (!faceIsOpen) {
    setFace(str)
  } else {
    faceHide()
  }
  faceIsOpen = !faceIsOpen
}

class Editable extends Component {

  static emitChange() {
    const html = document.querySelector('#editable').innerHTML
    emitOnChange && emitOnChange(html)
  }

  static emitSetAddress(addr) {
    emitOnSetAddress && emitOnSetAddress(addr)
  }

  componentDidMount() {
    if (this.props.userName) {
      const userNameWidth = document.querySelector('#userName').offsetWidth
      this.editable.style.textIndent = `${userNameWidth + 5}px`
    }
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.html !== this.editable.innerHTML
  }

  handleFocus() {
    saveRange()
    !this.props.isDebug && showMenu()
  }

  handleBlur() {
    saveRange()
    !this.props.isDebug && hideMenu()
  }

  handleInput() {
    const html = this.editable.innerHTML
    if (this.props.onChange && html !== this.lastHtml) {
      this.props.onChange(html)
    }
    this.lastHtml = html
  }

  render() {
    const { html, onChange, onSetAddress, isDebug, userName } = this.props
    emitOnChange = onChange
    emitOnSetAddress = onSetAddress

    return (
      <div className={styles.editable_box}>
        {!!userName && <span id="userName" className={styles.user_name}>{`@${renderUserName(userName)}`}</span>}
        <div
          id="editable"
          ref={(c) => { this.editable = c }}
          className={styles.editable}
          contentEditable
          onClick={::this.handleFocus}
          onFocus={::this.handleFocus}
          onBlur={::this.handleBlur}
          onInput={::this.handleInput}
          dangerouslySetInnerHTML={{ __html: renderContent(html) }}
        />
        {isDebug &&
        <div className={styles.opt_box}>
          <Button inline size="small" onClick={() => setImg('//o9u2lnvze.qnssl.com/practice_song_cover96a3fc4a-0bbc-4d82-a66d-31f0704ac06d.png')}>图片</Button>
          <Button inline size="small" onClick={() => setVideo('//o9u2lnvze.qnssl.com/music/practice-songs/d30AANhe9rtPf8gU-f5974e8d-62a6-47dc-90e5-0c85d3dfec19')}>视频</Button>
          <Button inline size="small" onClick={() => setAudio('//o9u2lnvze.qnssl.com//practice_songae40b290-7a28-4034-82a9-2b93b1e35448.mp3')}>语音</Button>
          <Button inline size="small" onClick={() => triggerFace('0.4')}>表情</Button>
          <Button inline size="small">话题</Button>
          <Button inline size="small" onClick={() => setAddress('上海虹口区测试地址,12,34')}>位置</Button>
        </div>}
        <FaceQQ />
      </div>
    )
  }
}

export default Editable
