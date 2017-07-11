import React, { Component } from 'react'
import classnames from 'classnames'
import { List, InputItem } from 'antd-mobile'
import ListCategory from './ListCategory'
import styles from './Content.less'

const Item = List.Item

class Content extends Component {

  handleChangeTitle(value) {
    this.props.onTextChange({ key: 'title', value })
  }

  handleChangeContent(value) {
    this.props.onTextChange({ key: 'content', value })
  }

  render() {
    const { categories, selected, item, onShowCategory, onSelected } = this.props

    return (
      <div className={classnames('content', styles.content)}>
        {!selected &&
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
              <InputItem placeholder="请输入正文（不少于8个字）" value={item.content} onChange={::this.handleChangeContent} />
            </div>
          </div>
        }
        {selected && <ListCategory list={categories} onSelected={onSelected} selected={item.bbsCategory} />}
      </div>
    )
  }
}

export default Content
