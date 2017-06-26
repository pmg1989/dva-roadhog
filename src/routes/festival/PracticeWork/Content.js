import React from 'react'
// import classnames from 'classnames'
import { Icon } from 'antd-mobile'
import { AudioPlayer } from 'NbComponent'
import styles from './Content.less'

const Content = () => {
  const audioPlayerProps = {
    source: 'https://o9u2lnvze.qnssl.com//practice_songd7a71296-42f5-40b5-bacb-141ea5d139b8.mp3',
    lrc: 'https://o9u2lnvze.qnssl.com//competition5a1e4747-2e3e-48ba-bba8-8b08b462d9c8.lrc',
  }

  return (
    <div className={styles.content_box}>
      <div className={styles.top}>
        <AudioPlayer {...audioPlayerProps} />
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
                <span className={styles.icon}>
                  <Icon type={require('../../../svg/festival/vote.svg')} />
                </span>
                <span>1660</span>
              </div>
              <div className={styles.music_icon}>
                <span className={styles.icon}><Icon type={require('../../../svg/festival/headphone.svg')} /></span>
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
      <div className={styles.row_box}></div>
    </div>
  )
}

export default Content
