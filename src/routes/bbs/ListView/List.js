import React from 'react'
import classnames from 'classnames'
import { Link } from 'dva/router'
import { Icon } from 'antd-mobile'
import utils from 'utils'
import Loading from './Loading'
import styles from './List.less'

const handleClick = (item) => {
  console.log(item.bbs_sendid)
}

const List = ({ list, loading, token }) => {
  return (
    <div className="ir-wrapper">
      <ul className="ir-scroller">
        <Loading loading={loading} />
        {list && list.map((item, key) => {
          return (
            <li key={key} onClick={() => handleClick(item)}>
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
                    {/* <div className={styles.text} dangerouslySetInnerHTML={{__html: item.content}}></div> */}
                  </div>
                  <div className={styles.bottom}>
                    <div className={styles.label_box}>
                      <Link className={styles.cname} to={`/bbs/category?cid=${item.bbs_cid}&token=${token}`}>{item.bbs_cname}</Link>
                      {item.label.map((lb, cur) => (
                        <Link key={cur} className={styles.label} to={`/bbs/tag?tag=${lb.label_id}&name=${lb.label_name}&token=${token}`}>#{lb.label_name}</Link>
                      ))}
                    </div>
                    <div className={classnames('flex-box', styles.opt_box)}>
                      {item.like === '1' &&
                      <div className={classnames('flex-item', styles.like)}>
                        <span><Icon type={require('../../../svg/like.svg')} /></span>
                        <span className={styles.count}>{item.heart_times}</span>
                      </div>
                      }
                      {item.like === '0' &&
                      <div className={classnames('flex-item', styles.unlike)}>
                        <span><Icon type={require('../../../svg/unlike.svg')} /></span>
                        <span className={styles.count}>{item.heart_times}</span>
                      </div>
                      }
                      <div className={classnames('flex-item', styles.replay)}>
                        <span><Icon type={require('../../../svg/discu.svg')} /></span>
                        <span className={styles.count}>{item.fellow_times}</span>
                      </div>
                      <div className={classnames('flex-item', styles.share)}>
                        <span><Icon type={require('../../../svg/share.svg')} /></span>
                      </div>
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

export default List
