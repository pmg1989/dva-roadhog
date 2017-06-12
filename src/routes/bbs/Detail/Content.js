import React from 'react'
import classnames from 'classnames'
import { Link } from 'dva/router'
import utils from 'utils'
import { AddressIcon } from 'NbComponent'
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
              <AddressIcon place={item.place} usercity={item.usercity} />
            </div>
            <div className={styles.date}>{utils.renderDate(item.create_date)}</div>
          </div>
          <div className={styles.middle}>
            <p className={styles.title}>{item.title}</p>
            {/* <div className={styles.text} dangerouslySetInnerHTML={{ __html: utils.renderContent(item.content) }} /> */}
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
