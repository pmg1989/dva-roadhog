import React from 'react'
import styles from './Bottom.less'

const Bottom = ({ onDownLoadClick }) => {
  return (
    <div className={styles.bottom_box}>
      <a className={styles.btn_blue} onClick={onDownLoadClick}>
        支持Ta
      </a>
      <a className={styles.btn_orange} onClick={onDownLoadClick}>
        挑战Ta
      </a>
    </div>
  )
}

export default Bottom
