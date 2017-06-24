import React from 'react'
// import classnames from 'classnames'
// import { Icon } from 'antd-mobile'
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
    </div>
  )
}

export default Content
