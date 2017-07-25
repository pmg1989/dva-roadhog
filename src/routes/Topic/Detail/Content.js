import React from 'react'
import { renderDate } from 'utils/tools'
import styles from './Content.less'

const getDateDiff = (time) => {
  const newtime = time && time.replace(/-/g, '/')
  const timeSpan = new Date(newtime).getTime() / 1000
  return renderDate(timeSpan)
}

const Content = ({ item }) => {
  return (
    <div className={styles.content}>
      <div className={styles.detail}>
        <h4 className={styles.title}>{item.title}</h4>
        <div className={styles.tag_box}>
          {!!item.keywords &&
            <span className={styles.tag}>#{item.keywords}#{' '}</span>
          }
          <span className={styles.time}>{getDateDiff(item.createTime)}</span>
        </div>
        <div id="text" className={styles.text} dangerouslySetInnerHTML={{ __html: item.content }} />
      </div>
    </div>
  )
}

export default Content
