import React from 'react'
// import classnames from 'classnames'
import { Icon } from 'antd-mobile'
import { AudioPlayer } from 'NbComponent'
import utils from 'utils'
import Video from '../../bbs/Video'
import styles from './Content.less'

const Content = ({ item, onDownLoadClick }) => {
  const audioPlayerProps = {
    cover: item.cover.full_url,
    source: item.file.full_url,
    lrcUrl: item.practice_song.lyric.full_url,
    lrcClick: false,
  }

  const dicAcv = {
    '一曲成名': 'vinyl_best',
    '白金唱片': 'vinyl_platinum',
    '金唱片': 'vinyl_golden',
    '银唱片': 'vinyl_silver',
    '铜唱片': 'vinyl_copper'
  }
  const achievement = item.achievement.find(cur => {
    return cur.rest === 0
  })

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
                {utils.renderDate(item.ctime)}
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
      <div className={styles.row_box}>
        <div className={styles.row} onClick={onDownLoadClick}>
          <span className={styles.tips}>该作品参加了“{item.competition.title}”</span>
          <span><Icon type={require('../../../svg/festival/enter.svg')} /></span>
        </div>
        <div className={styles.row} onClick={onDownLoadClick}>
          {!!achievement &&
          <div className={styles.thumb_box}>
            <img alt="" src={`/images/festival/${dicAcv[achievement && achievement.title]}.png`} />
            <span>
              {achievement && achievement.achieve_user && achievement.achieve_user.username}
              帮助{item.user.profile && item.user.profile.name}达成了“
              <span className={styles.blue}>{achievement && achievement.title}</span>”成就！
            </span>
          </div>}
          {!achievement &&
          <div className={styles.thumb_box}>
            <img alt="" src={`/images/festival/${dicAcv[!!item.achievement.length && item.achievement[4].title]}.png`} />
            <span>
              还差{!!item.achievement.length && item.achievement[4].rest}票达成“
              <span className={styles.blue}>{!!item.achievement.length && item.achievement[4].title}</span>”
            </span>
          </div>}

          <span><Icon type={require('../../../svg/festival/enter.svg')} /></span>
        </div>
      </div>
    </div>
  )
}

export default Content
