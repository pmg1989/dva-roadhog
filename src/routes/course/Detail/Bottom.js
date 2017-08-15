import React from 'react'
import { logoSrc } from 'utils/config'
import styles from './Bottom.less'

const Bottom = ({ onDownLoadClick }) => {
  return (
    <div className={styles.bottom_box}>
      <div className={styles.logo_box}>
        <img src={logoSrc} alt="logo" />
        <span>与明星一起玩音乐 </span>
      </div>
      <a className={styles.btn_blue} onClick={onDownLoadClick}>立即打开</a>
    </div>
  )
}

export default Bottom
