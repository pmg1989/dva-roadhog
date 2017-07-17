import React from 'react'
import classnames from 'classnames'
import { Link } from 'dva/router'
import { Icon } from 'antd-mobile'
import { renderAbstract, renderIva, renderDate, renderTimes } from 'utils/tools'
import { LikeIcon, ShareIcon, AddressIcon } from 'NbComponent'
import Loading from './Loading'
import styles from './ListView.less'

const ListView = ({ list, loading, token, linkTo, like }) => {
  const LinkToDetail = (item) => {
    linkTo({ sendid: item.bbs_sendid })
  }

  return (
    <div className="ir-wrapper">
      <ul className="ir-scroller">
        <Loading loading={loading} />
        {list && list.map((item, key) => {
          return (
            <li key={key} onClick={() => LinkToDetail(item)}>
              <div className="flex-box">
                <div className={styles.thumb_box}>
                  <img src={item.user_img} alt={item.title} />
                </div>
                <div className={classnames('flex-item', styles.right_box)}>
                  <div className={styles.top}>
                    <div className={styles.name_box}>
                      <span className={styles.name}>{item.user_name}</span>
                      <div className={styles.date}>{renderDate(item.create_date)}</div>
                    </div>
                    <AddressIcon place={item.place} usercity={item.usercity} />
                  </div>
                  <div className={styles.middle}>
                    <p className={styles.title}>{item.title}</p>
                    <div className={styles.text} dangerouslySetInnerHTML={{ __html: renderAbstract(item.content) }} />
                    <div className={styles.iva_box} dangerouslySetInnerHTML={{ __html: renderIva(item.content) }} />
                  </div>
                  <div className={styles.bottom}>
                    <div className={styles.label_box}>
                      <Link className={styles.cname} to={`/bbs/category?cid=${item.bbs_cid}&token=${token}`} onClick={(e) => { e.stopPropagation() }}>{item.bbs_cname}</Link>
                      {item.label.map((lb, cur) => (
                        <Link key={cur} className={styles.label} to={`/bbs/tag?tag=${lb.label_id}&name=${lb.label_name}&token=${token}`} onClick={(e) => { e.stopPropagation() }}>#{lb.label_name}</Link>
                      ))}
                    </div>
                    <div className={classnames('flex-box', styles.opt_box)}>
                      <LikeIcon item={item} handleLike={like} type="send" />
                      <div className={classnames('flex-item', styles.replay)}>
                        <span><Icon type={require('../../svg/discu.svg')} /></span>
                        <span className={styles.count}>{renderTimes(+item.fellow_times)}</span>
                      </div>
                      <ShareIcon item={item} />
                    </div>
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default ListView
