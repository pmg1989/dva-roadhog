import React from 'react'
import classnames from 'classnames'
import { Link } from 'dva/router'
import { Icon } from 'antd-mobile'
import { renderDate, renderTimes, renderContent } from 'utils/tools'
import { LikeIcon, ThumbIcon } from 'NbComponent'
import styles from './Content.less'

const Content = ({ sendid, token, item, like }) => {
  return (
    <div className={classnames('content', styles.content)}>
      <div className="flex-box">
        <ThumbIcon uid={item.userid} image={item.userimg} alt={item.username} />
        <div className={classnames('flex-item', styles.right_box)}>
          <div className={classnames('flex-box', styles.top)}>
            <div className="flex-item">
              <span className={styles.name}>{item.username}</span><br />
              <span className={styles.date}>{renderDate(item.senddate)}</span>
            </div>
            <div className={classnames('flex-box', styles.opt_box)}>
              <LikeIcon item={item} handleLike={like} />
              <div className={classnames('flex-item', styles.replay)}>
                <Link to={`/bbs/replay?fellowid=${item.bbsfellowid}&sendid=${sendid}&token=${token}`}>
                  <span><Icon type={require('../../../svg/discu.svg')} /></span>
                  <span className={styles.count}>{renderTimes(+item.fellowtimes)}</span>
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.middle}>
            <div className={styles.text} dangerouslySetInnerHTML={{ __html: renderContent(item.content) }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Content
