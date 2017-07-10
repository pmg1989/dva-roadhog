import React from 'react'
import classnames from 'classnames'
import { Button } from 'antd-mobile'
import Video from '../../bbs/Video'
import styles from './Content.less'

const Content = ({ item, onDownLoadClick }) => {
  return (
    <div className={styles.content_box}>
      <div className={styles.top}>
        {item.detail_file_detail && <Video src={item.detail_file_detail.full_url} />}
      </div>
      <div className={styles.info_box}>
        <dl className={classnames(styles.date, 'flex-box')}>
          <dt>活动时间：</dt>
          {item.vote_date_start &&
          <dd>{new Date(+item.vote_date_start * 1000).format('yyyy年MM月dd日')}-{new Date(+item.vote_date_end * 1000).format('dd日')}</dd>}
        </dl>
        <dl className={classnames(styles.practice, 'flex-box')}>
          <dt>本期指定曲目：</dt>
          <dd>{item.course_detail.lessons[0].title}</dd>
        </dl>
        <div className={styles.description}>
          {item.description && item.description.split('\n').map((text, key) => {
            return <span key={key}>{text}<br /></span>
          })}
        </div>
      </div>
      <div className={styles.course_box}>
        <div className={styles.title}>本期指定曲目</div>
        <div className={classnames(styles.flex_box, styles.practice)}>
          <div className={styles.left_box}>
            <div className={styles.thumb_box}>
              <img className={styles.thumb} alt={item.course_detail.lessons[0].title} src={item.course_detail.lessons[0].full_url} />
            </div>
            <div className={styles.info}>
              <span className={styles.name}>{item.course_detail.lessons[0].title}</span>
              <span className={styles.author}>{item.course_detail.lessons[0].description}</span>
            </div>
          </div>
          <div className={styles.download_box}>
            <Button onClick={onDownLoadClick} className={styles.download} icon={require('../../../svg/festival/download.svg')}>
              下载观看
            </Button>
          </div>
        </div>
        <div className={styles.title}>大师教学示范</div>
        <div className={classnames(styles.flex_box, styles.master)}>
          <div className={styles.left_box}>
            <div className={styles.thumb_box}>
              <img className={styles.thumb} alt={item.course_detail.lessons[1].title} src={item.course_detail.lessons[1].full_url} />
            </div>
            <div className={styles.info}>
              <span className={styles.name}>{item.course_detail.lessons[1].title}</span>
              <span className={styles.author}>{item.course_detail.lessons[1].description}</span>
            </div>
          </div>
          <div className={styles.download_box}>
            <Button onClick={onDownLoadClick} className={styles.download} icon={require('../../../svg/festival/lock.svg')}>
              解锁观看
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Content
