import React from 'react'
import classnames from 'classnames'
import { Icon } from 'antd-mobile'
import utils from 'utils'
import styles from './ShareIcon.less'

const ShareIcon = ({ item }) => {
  const handleShare = (e) => {
    e.stopPropagation()

    const content = utils.removeHTMLTag(item.content)

    const shareParams = {
      title: item.title,
      content: content.length > 50 ? `${content.substring(0, 50)}...` : content,
      image: item.user_img,
      url: item.share_url,
    }
    console.log(shareParams)
  }

  return (
    <div className={classnames('flex-item', styles.share)} onClick={handleShare}>
      <span><Icon type={require('../../svg/share.svg')} /></span>
    </div>
  )
}

export default ShareIcon
