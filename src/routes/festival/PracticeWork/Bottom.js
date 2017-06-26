import React from 'react'
import styles from './Bottom.less'

const Bottom = () => {
  return (
    <div className={styles.bottom_box}>
      <a className={styles.btn_blue}>
        支持Ta
      </a>
      <a className={styles.btn_orange}>
        挑战Ta
      </a>
    </div>
  )
}

export default Bottom
