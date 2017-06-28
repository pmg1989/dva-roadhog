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
    // lrcUrl: 'https://o9u2lnvze.qnssl.com//competition5a1e4747-2e3e-48ba-bba8-8b08b462d9c8.lrc',
    lrcData: item.lrc,
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
        <div className={styles.description} dangerouslySetInnerHTML={{ __html: item.description }} />
      </div>
      <div className={styles.row_box} />
    </div>
  )
}

export default Content
