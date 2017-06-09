import React from 'react'
import classnames from 'classnames'
import { Link } from 'dva/router'
import { Icon } from 'antd-mobile'
import utils from 'utils'
import styles from './Content.less'

const Content = ({ sendid, token, item, likeReplay, unlikeReplay }) => {
  const handleLike = (e) => {
    e.stopPropagation()
    likeReplay()
  }

  const handleUnLike = (e) => {
    e.stopPropagation()
    unlikeReplay()
  }

  return (
    <div className={classnames('content', styles.content)}>
      <div className="flex-box">
        <div className={styles.thumb_box}>
          <img src={item.userimg} alt={item.username} />
        </div>
        <div className={classnames('flex-item', styles.right_box)}>
          <div className={classnames('flex-box', styles.top)}>
            <div className="flex-item">
              <span className={styles.name}>{item.username}</span><br />
              <span className={styles.date}>{utils.renderDate(item.senddate)}</span>
            </div>
            <div className={classnames('flex-box', styles.opt_box)}>
              {item.like === '1' &&
              <div className={classnames('flex-item', styles.like)} onClick={handleUnLike}>
                <span><Icon type={require('../../../svg/like.svg')} /></span>
                <span className={styles.count}>{utils.renderTimes(+item.hearttimes)}</span>
              </div>
              }
              {item.like === '0' &&
              <div className={classnames('flex-item', styles.unlike)} onClick={handleLike}>
                <span><Icon type={require('../../../svg/unlike.svg')} /></span>
                <span className={styles.count}>{utils.renderTimes(+item.hearttimes)}</span>
              </div>
              }
              <div className={classnames('flex-item', styles.replay)}>
                <Link to={`/replay?fellowid=${item.bbsfellowid}&sendid=${sendid}&token=${token}`}>
                  <span><Icon type={require('../../../svg/discu.svg')} /></span>
                  <span className={styles.count}>{utils.renderTimes(+item.fellowtimes)}</span>
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.middle}>
            <div className={styles.text} dangerouslySetInnerHTML={{ __html: utils.renderContent(item.content) }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Content
