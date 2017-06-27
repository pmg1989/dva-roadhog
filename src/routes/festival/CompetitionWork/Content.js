import React from 'react'
// import classnames from 'classnames'
import { Icon } from 'antd-mobile'
import { AudioPlayer } from 'NbComponent'
import utils from 'utils'
import Video from '../../bbs/Video'
import styles from './Content.less'

const Content = ({ item }) => {
  console.log(item)

  const audioPlayerProps = {
    source: item.file.full_url,
    lrc: 'https://o9u2lnvze.qnssl.com//competition5a1e4747-2e3e-48ba-bba8-8b08b462d9c8.lrc',
    lrcClick: false,
  }

  return (
    <div className={styles.content_box}>
      <div className={styles.top}>
        {item.type === 'video' && <Video src={item.file.full_url} />}
        {item.type === 'audio' && <AudioPlayer {...audioPlayerProps} />}
      </div>
      <div className={styles.info_box}>
        <div className={styles.info}>
          <div className={styles.thumb_box}>
            <img alt={item.user.profile && item.user.profile.name} src={item.user.image} />
          </div>
          <div className={styles.right_box}>
            <div className={styles.name}>{item.user.profile && item.user.profile.name}</div>
            <div className={styles.icon_box}>
              <div className={styles.vote_icon}>
                <span className={styles.icon}>
                  <Icon type={require('../../../svg/festival/vote.svg')} />
                </span>
                <span>{item.votes}</span>
              </div>
              <div className={styles.music_icon}>
                <span className={styles.icon}><Icon type={require('../../../svg/festival/headphone.svg')} /></span>
                <span>{item.views}</span>
              </div>
              <div className={styles.date_time}>
                {utils.renderDate(item.create_date)}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.description}>
          {item.description}
        </div>
      </div>
      <div className={styles.row_box}>
        <div className={styles.row}>
          <span className={styles.tips}>该作品参加了“{item.competition.title}”</span>
          <span><Icon type={require('../../../svg/festival/enter.svg')} /></span>
        </div>
        <div className={styles.row}>
          <div className={styles.thumb_box}>
            <img alt="" src={'http://image.xishiqu.cn/upload/userUpload/920/160/920160622//m/5AF70F21-E6BA-BB06-2E6D-A32CE56B3600.jpg'} />
            <span>哈哈帮助阿花达成了“<span className={styles.blue}>金唱片</span>”成就！</span>
          </div>

          <span><Icon type={require('../../../svg/festival/enter.svg')} /></span>
        </div>
      </div>
    </div>
  )
}

export default Content
