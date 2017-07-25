import React from 'react'
import styles from './Footer.less'

const Footer = ({ onDownLoadClick }) => {
  return (
    <div className={styles.fixed}>
      <a className={styles.btn_to_app} onClick={onDownLoadClick}>
        去牛班聊音乐
      </a>
    </div>
  )
}

export default Footer
