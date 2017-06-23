import React from 'react'
// import classnames from 'classnames'
// import { Icon } from 'antd-mobile'
import { AudioPlayer } from 'NbComponent'
import styles from './Content.less'

const Content = () => {
  return (
    <div className={styles.content_box}>
      <div className={styles.top}>
        <AudioPlayer />
      </div>
    </div>
  )
}

export default Content
