import React from 'react'
import classnames from 'classnames'
import { Icon } from 'antd-mobile'
import utils from 'utils'
import styles from './LikeIcon.less'

const LikeIcon = ({ item, handleLike, type }) => {
  const isLike = item.like === '1'

  const clickLike = (e) => {
    e.stopPropagation()
    if (type === 'send') {
      handleLike({ sendid: item.bbs_sendid, isLike: !isLike })
    } else {
      handleLike({ fellowid: item.bbsfellowid || '', isLike: !isLike })
    }
  }

  return (
    <div className={classnames('flex-item', isLike ? styles.like : styles.unlike)} onClick={clickLike}>
      <span><Icon type={isLike ? require('../../svg/like.svg') : require('../../svg/unlike.svg')} /></span>
      <span className={styles.count}>{utils.renderTimes(+(item.hearttimes || item.heart_times))}</span>
    </div>
  )
}

export default LikeIcon
