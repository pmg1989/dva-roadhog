import React from 'react'
import { Link } from 'dva/router'
import styles from './Footer.less'

const Footer = ({ share, token, sendid, item }) => {
  const ReplayFooter = () => (
    <div className="flex-box">
      <div className="flex-item">
        <Link className={styles.btn_replay} to={`/bbs/replay?fellowid=${item.bbsfellowid}&sendid=${sendid}&token=${token}`}>
          回复帖子...
        </Link>
      </div>
    </div>
  )

  const ShareFooter = () => (
    <a className={styles.btn_to_app} href="//a.app.qq.com/o/simple.jsp?pkgname=com.newband">
      去牛班聊音乐
    </a>
  )

  return (
    <div className={styles.fixed}>
      { share ? <ShareFooter /> : <ReplayFooter /> }
    </div>
  )
}

export default Footer
