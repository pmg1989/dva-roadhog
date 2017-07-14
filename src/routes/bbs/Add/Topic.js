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
    const $editable = $('#editableTopic')
    const $inputList = $('#editableTopic input')

    function getInputList() {
      let inputList = ''
      $inputList.each(function() {
        inputList += `<input type='button' value='${$(this).val()}'>`
      })
      return inputList
    }

    function renderTopicList() {
      const list = []
      $('#editableTopic input').each(function() {
        list.push({ label: $(this).val().replace('#', '') })
      })
      return list
    }

    const key = e.which
    if (key === 13) { // enter
      e.preventDefault()

      let html = $editable.not('input').text().trim()
      if (!html.length) {
        return false
      }

      if ($inputList.length >= 3) {
        Toast.fail('最多只能生成3个标签')
        $editable.html(getInputList())
        keyAction('editableTopic')
        return false
      }

      if (html.length > 15) {
        Toast.fail('最多只能输入15个字符')
        return false
      }
      html = `${getInputList()}<input type='button' value='#${html}'>`
      $editable.html(html)
      keyAction('editableTopic')
      this.props.onChange(renderTopicList())
    }
  }

  handleInput() {
    this.lastHtml = this.editableTopic.innerHTML
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
        onKeyDown={::this.handleKeydown}
        onInput={::this.handleInput}
      />
    )
  }
}

export default Topic
