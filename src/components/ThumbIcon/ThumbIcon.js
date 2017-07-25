import React from 'react'
import { openUser } from 'utils/app'
import { replaceHostName } from 'utils/tools'
import styles from './ThumbIcon.less'

const ThumbIcon = ({ uid, image, alt }) => {
  const handleClick = (e) => {
    e.stopPropagation()
    openUser(uid)
  }

  return (
    <div className={styles.thumb_box}>
      <img src={replaceHostName(image)} alt={alt} onClick={handleClick} />
    </div>
  )
}

export default ThumbIcon
