import React, { Component } from 'react'
import classnames from 'classnames'
import { List, InputItem } from 'antd-mobile'
import { Editable } from 'NbComponent'
import ListCategory from './ListCategory'
import Topic from './Topic'
import styles from './Content.less'

const Item = List.Item

class Content extends Component {

  handleChangeTitle(value) {
    this.props.onTextChange({ key: 'title', value })
  }

  render() {
    const { categories, headerStatus, item, onShowCategory, onSelected, debug } = this.props

    const editablePorps = {
      isDebug: debug === '1',
      html: item.content,
      placeholder: '请输入正文（不少于8个字）',
      onChange: (html) => {
        this.props.onTextChange({ key: 'content', value: html })
      },
      onSetAddress: ({ place, latitude, longitude }) => {
        this.props.onAddressChange({ place, latitude, longitude })
      },
    }

    const topicProps = {
      isShow: headerStatus === 'topic',
      onChange: (list) => {
        this.props.onTextChange({ key: 'bbslabel', value: list })
      },
    }

    return (
      <div className={classnames('content', styles.content)}>
        {headerStatus === 'add' &&
          <div>
            <div className={classnames(styles.row, styles.border)}>
              <Item arrow="horizontal" onClick={onShowCategory}>
                {item.bbsCategory.name || '请选择帖子类型(必选)'}
              </Item>
            </div>
            <div className={styles.row}>
              <InputItem placeholder="请给帖子起个标题" value={item.title} onChange={::this.handleChangeTitle} />
            </div>
            <div className={styles.row}>
              <Editable {...editablePorps} />
            </div>
          </div>
        }
        {headerStatus === 'categories' && <ListCategory list={categories} onSelected={onSelected} selected={item.bbsCategory} />}
        <Topic {...topicProps} />
      </div>
    )
  }
}

export default Content
