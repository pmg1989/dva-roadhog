import React from 'react'
import classnames from 'classnames'
import { Link } from 'dva/router'
import { renderDate, renderContent } from 'utils/tools'
import { AddressIcon, ThumbIcon } from 'NbComponent'
import styles from './Content.less'

const Content = ({ share, token, item }) => {
  return (
    <div className={classnames({ content: !share }, styles.content)}>
      <div className="flex-box">
        <ThumbIcon uid={item.user_id} image={item.user_img} alt={item.title} />
        <div className={classnames('flex-item', styles.right_box)}>
          <div className={styles.top}>
            <div className={styles.name_box}>
              <span className={styles.name}>{item.user_name}</span><br />
              <div className={styles.date}>{renderDate(item.create_date)}</div>
            </div>
            <AddressIcon place={item.place} usercity={item.usercity} />
          </div>
          <div className={styles.middle}>
            <p className={styles.title}>{item.title}</p>
            <div className={styles.text} dangerouslySetInnerHTML={{ __html: renderContent(item.content) }} />
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
