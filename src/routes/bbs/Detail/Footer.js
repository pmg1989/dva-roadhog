import React from 'react'
import classnames from 'classnames'
import { Link } from 'dva/router'
import { Icon } from 'antd-mobile'
import utils from 'utils'
import styles from './Footer.less'

const Footer = ({ share, token, sendid, item, like, unlike }) => {
  const ReplayFooter = () => (
    <div className="flex-box">
      <div className="flex-item">
        <Link className={styles.btn_replay} to={`/replay?fellowid=0&sendid=${sendid}&token=${token}`}>
          回复帖子...
        </Link>
      </div>
      <div className={classnames('flex-box', styles.opt_box)}>
        {item.like === '1' &&
        <div className={classnames('flex-item', styles.like)} onClick={unlike}>
          <span><Icon type={require('../../../svg/like.svg')} /></span>
          <span className={styles.count}>{utils.renderTimes(+item.heart_times)}</span>
        </div>
        }
        {item.like === '0' &&
        <div className={classnames('flex-item', styles.unlike)} onClick={like}>
          <span><Icon type={require('../../../svg/unlike.svg')} /></span>
          <span className={styles.count}>{utils.renderTimes(+item.heart_times)}</span>
        </div>
        }
        <div className={classnames('flex-item', styles.share)}>
          <span><Icon type={require('../../../svg/share.svg')} /></span>
        </div>
      </div>
    </div>
  )

  const ShareFooter = () => (
    <a className={styles.btn_to_app} href="http://a.app.qq.com/o/simple.jsp?pkgname=com.newband">
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
