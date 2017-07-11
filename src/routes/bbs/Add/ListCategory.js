import React from 'react'
import classnames from 'classnames'
import { List } from 'antd-mobile'
import styles from './ListCategory.less'

const Item = List.Item

const ListCategory = ({ list, onSelected, selected }) => {
  return (
    <div className={styles.list_box}>
      <List>
        {list.map((item, key) => (
          <Item className={classnames({ [styles.selected]: selected.cid === item.cid })} key={key} onClick={() => onSelected({ cid: item.cid, name: item.name })}>{item.name}</Item>
        ))}
      </List>
    </div>
  )
}

export default ListCategory
