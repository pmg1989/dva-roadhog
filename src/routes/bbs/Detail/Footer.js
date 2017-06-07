import React from 'react'
import classnames from 'classnames'
import { Link } from 'dva/router'
import { Icon } from 'antd-mobile'
import styles from './Footer.less'

const Footer = () => {
  return (
    <div className={styles.fixed}>
      <div className="flex-box">
        <div className="flex-item">
          <Link className={styles.btn_replay} to={'/replay?replay_id=0&sendid=&token'}>
            回复帖子...
          </Link>
        </div>
        <div className={classnames('flex-box', styles.opt_box)}>
          <div className={classnames('flex-item', styles.like)} onClick={e => this.handleUnLike(e)}>
            <span><Icon type={require('../../../svg/like.svg')} /></span>
            <span className={styles.count}>100</span>
          </div>
          <div className={classnames('flex-item', styles.share)}>
            <span><Icon type={require('../../../svg/share.svg')} /></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
