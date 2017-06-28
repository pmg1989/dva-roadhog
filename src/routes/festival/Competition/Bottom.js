import React from 'react'
import styles from './Bottom.less'

const Bottom = ({ expired, onDownLoadClick }) => {
  return (
    <div className={styles.bottom_box}>
      {!expired && <a className={styles.btn_blue} onClick={onDownLoadClick}>参赛</a>}
      {expired && <a className={styles.btn_blue}>已结束</a>}
    </div>
  )
}

export default Bottom
