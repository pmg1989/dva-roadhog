import React from 'react'
import classnames from 'classnames'
import { Link } from 'dva/router'
import { Icon } from 'antd-mobile'
import utils from 'utils'
import styles from './Content.less'

const Content = ({ token, item }) => {
  return (
    <div className={classnames('content', styles.content)}>
      <div className="flex-box">
        <div className={styles.thumb_box}>
          <img src={item.user_img} alt={item.title} />
        </div>
        <div className={classnames('flex-item', styles.right_box)}>
          <div className={classnames('flex-box', styles.top)}>
            <div className="flex-item">
              <span className={styles.name}>{item.user_name}</span><br />
              {!!item.place &&
              <span className={styles.place}>
                <span><Icon type={require('../../../svg/like.svg')} /></span>
                <span className={styles.place_str}>{item.place}</span>
              </span>}
              {!item.place && <span className={styles.place_gray}>{item.usercity}</span>}
            </div>
            <div className={styles.date}>{utils.renderDate(item.create_date)}</div>
          </div>
          <div className={styles.middle}>
            <p className={styles.title}>{item.title}</p>
            {/* <iframe width="100%" height="100%" frameBorder="0" scrolling="yes" onload="setWinHeight(this)" src="/video.html?video=http://bbs.nwbasset.com/Fho4qcj9lDlgi0XXePR3FwMTfcZz"></iframe> */}
            <div className={styles.text} dangerouslySetInnerHTML={{ __html: utils.renderContent(item.content) }} />
          </div>
          <div className={styles.bottom}>
            <div className={styles.label_box}>
              <Link className={styles.cname} to={`/bbs/category?cid=${item.bbs_cid}&token=${token}`}>{item.bbs_cname}</Link>
              {item.label && item.label.map((lb, cur) => (
                <Link key={cur} className={styles.label} to={`/bbs/tag?tag=${lb.label_id}&name=${lb.label_name}&token=${token}`}>#{lb.label_name}</Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Content
