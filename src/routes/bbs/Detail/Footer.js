import React from 'react'
import classnames from 'classnames'
import { Link } from 'dva/router'
import { LikeIcon, ShareIcon } from 'NbComponent'
import styles from './Footer.less'

const Footer = ({ share, token, sendid, item, like }) => {
  const ReplayFooter = () => (
    <div className="flex-box">
      <div className="flex-item">
        <Link className={styles.btn_replay} to={`/bbs/replay?fellowid=0&sendid=${sendid}&userid=${item.user_id}&token=${token}`}>
          回复帖子...
        </Link>
      </div>
      <div className={classnames('flex-box', styles.opt_box)}>
        <LikeIcon item={item} handleLike={like} />
        <ShareIcon item={item} />
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
