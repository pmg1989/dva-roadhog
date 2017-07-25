import React from 'react'
// import classnames from 'classnames'
import { Icon } from 'antd-mobile'
import { AudioPlayer } from 'NbComponent'
import { renderDate } from 'utils/tools'
import { defaultImage } from 'utils/config'
import Video from '../../bbs/Video'
import styles from './Content.less'

const Content = ({ item }) => {
  const audioPlayerProps = {
    cover: (item.cover && item.cover.full_url) || defaultImage,
    source: item.file.full_url,
    lrcUrl: item.practice_song.lyric.full_url,
    lrcClick: false,
  }

  return (
    <div className={styles.content_box}>
      <div className={styles.top}>
        {item.type === 'video' && <Video src={item.file.full_url} cover={(item.cover && item.cover.full_url) || defaultImage} />}
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
                {renderDate(item.ctime)}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.description}>
          {item.description && item.description.split('\n').map((text, key) => {
            return <span key={key}>{text}<br /></span>
          })}
        </div>
      </div>
      <div className={styles.row_box} />
    </div>
  )
}

export default Content
