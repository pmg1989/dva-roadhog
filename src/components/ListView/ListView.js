import React from 'react'
import classnames from 'classnames'
import { Link } from 'dva/router'
import { Icon } from 'antd-mobile'
import { renderAbstract, renderIva, renderDate, renderTimes, isApp } from 'utils/tools'
import { LikeIcon, ShareIcon, AddressIcon, ThumbIcon } from 'NbComponent'
import Loading from './Loading'
import styles from './ListView.less'

const ListView = ({ list, loading, token, linkTo, like }) => {
  const LinkToDetail = (item) => {
    pausePlayva() // 播放当前之前，先暂停所有播放
    if (isApp) {
      location.href = `/bbs/detail/${item.bbs_sendid}?token=${token}`
    } else {
      linkTo({ sendid: item.bbs_sendid })
    }
  }

  const handleAppLink = (e) => {
    e.stopPropagation()
    pausePlayva() // 播放当前之前，先暂停所有播放
    if (isApp) {
      e.preventDefault()
      location.href = e.currentTarget.href
    }
  }

  return (
    <div className="ir-wrapper">
      <ul className="ir-scroller">
        <Loading loading={loading} />
        {list && list.map((item, key) => {
          return (
            <li key={key} onClick={() => LinkToDetail(item)}>
              <div className="flex-box">
                <ThumbIcon uid={item.user_id} image={item.user_img} alt={item.title} />
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
                    {item.content && <div className={styles.text} dangerouslySetInnerHTML={{ __html: renderAbstract(item.content) }} />}
                    {item.content && <div className={styles.iva_box} dangerouslySetInnerHTML={{ __html: renderIva(item.content) }} />}
                  </div>
                  <div className={styles.bottom}>
                    <div className={styles.label_box}>
                      <Link onClick={handleAppLink} className={styles.cname} to={`/bbs/category?cid=${item.bbs_cid}&token=${token}`}>{item.bbs_cname}</Link>
                      {item.label.map((lb, cur) => (
                        <Link onClick={handleAppLink} key={cur} className={styles.label} to={`/bbs/tag?tag=${lb.label_id}&name=${lb.label_name}&token=${token}`}>#{lb.label_name}</Link>
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
