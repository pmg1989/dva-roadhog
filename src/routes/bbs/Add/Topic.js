import React, { Component } from 'react'
import classnames from 'classnames'
import { Toast } from 'antd-mobile'
import $ from 'jQuery'
import styles from './Topic.less'

let emitOnShowTopic

// 针对div(contenteditable="true") 光标移到最后
function keyAction(id) {
  const textbox = document.getElementById(id)
  const sel = window.getSelection()
  const range = document.createRange()
  range.selectNodeContents(textbox)
  range.collapse(false)
  sel.removeAllRanges()
  sel.addRange(range)
}

class Topic extends Component {

  static showTopic() {
    emitOnShowTopic()
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.html !== this.editableTopic.innerHTML
  }

  handleKeydown(e) {
    const key = e.which
    if (key === 13) { // enter
      e.preventDefault()
      let html = $('#editableTopic').not('input').text().trim()
      if (html.length > 15) {
        Toast.fail('最多只能输入15个字符')
        return false
      }
      if (!!html.length) {
        html = `<input type='button' value='#${html}'>`
      }

      let inputList = ''
      $('#editableTopic input').each(function() {
        inputList += `<input type='button' value='${$(this).val()}'>`
      })
      $('#editableTopic').html(inputList)

      if ($('#editableTopic input').length >= 3) {
        Toast.fail('最多只能生成3个标签')
        keyAction('editableTopic')
        return false
      }
      $('#editableTopic').append(html)
      keyAction('editableTopic')
      this.props.onChange(inputList + html)
    }
  }

  handleInput() {
    const html = this.editableTopic.innerHTML
    // if (this.props.onChange && html !== this.lastHtml) {
    //   this.props.onChange(html)
    // }
    this.lastHtml = html
  }

  render() {
    const { isShow, onShowTopic } = this.props
    emitOnShowTopic = onShowTopic

    return (
      <div
        id="editableTopic"
        placeholder="请输入关键字,按回车键自动生成"
        ref={(c) => { this.editableTopic = c }}
        className={classnames(styles.editable_topic, { [styles.active]: isShow })}
        contentEditable
        // onClick={::this.handleFocus}
        // onFocus={::this.handleFocus}
        // onBlur={::this.handleBlur}
        onKeyDown={::this.handleKeydown}
        // onInput={::this.handleInput}
        // dangerouslySetInnerHTML={{ __html: renderContent(html) }}
      />
    )
  }
}

export default Topic
