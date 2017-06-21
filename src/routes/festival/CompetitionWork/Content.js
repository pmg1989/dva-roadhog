import React from 'react'
// import classnames from 'classnames'
import { Icon } from 'antd-mobile'
import Video from '../../bbs/Video'
import styles from './Content.less'

const Content = () => {
  return (
    <div className={styles.content_box}>
      <div className={styles.top}>
        <Video src={'https://o9u2lnvze.qnssl.com/music/practice-songs/d30AANhe9rtPf8gU-f5974e8d-62a6-47dc-90e5-0c85d3dfec19'} />
      </div>
      <div className={styles.info_box}>
        <div className={styles.info}>
          <div className={styles.thumb_box}>
            <img alt="" src={'http://image.xishiqu.cn/upload/userUpload/920/160/920160622//m/5AF70F21-E6BA-BB06-2E6D-A32CE56B3600.jpg'} />
          </div>
          <div className={styles.right_box}>
            <div className={styles.name}>Sarah</div>
            <div className={styles.icon_box}>
              <div className={styles.vote_icon}>
                <span className={styles.icon}><Icon type={require('../../../svg/lock.svg')} /></span>
                <span>1660</span>
              </div>
              <div className={styles.music_icon}>
                <span className={styles.icon}><Icon type={require('../../../svg/lock.svg')} /></span>
                <span>1624</span>
              </div>
              <div className={styles.date_time}>
                今天 12：58
              </div>
            </div>
          </div>
        </div>
        <div className={styles.description}>
          我是大赛详细介绍我是大赛详细介绍我是大赛详细介绍我是大赛详细介绍我是大赛详细介绍我是大赛详细介绍我是大赛详细介绍
        </div>
      </div>
      <div className={styles.row_box}>
        <div className={styles.row}>
          <span className={styles.tips}>该作品参加了“牛班原创音乐节”</span>
          <span><Icon type={require('../../../svg/lock.svg')} /></span>
        </div>
        <div className={styles.row}>
          <div className={styles.thumb_box}>
            <img alt="" src={'http://image.xishiqu.cn/upload/userUpload/920/160/920160622//m/5AF70F21-E6BA-BB06-2E6D-A32CE56B3600.jpg'} />
            <span>哈哈帮助阿花达成了“<span className={styles.blue}>金唱片</span>”成就！</span>
          </div>

          <span><Icon type={require('../../../svg/lock.svg')} /></span>
        </div>
      </div>
    </div>
  )
}

export default Content
