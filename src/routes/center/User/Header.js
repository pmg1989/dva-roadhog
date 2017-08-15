import React from 'react'
import styles from './Header.less'

const Header = ({ user, onDownLoadClick }) => {
  return (
    <div className={styles.container}>
      <div className={styles.info_box}>
        {user.image &&
          <div className={styles.thumb} style={{
            background: `url('${user.image}') no-repeat center center`,
            backgroundSize: 'cover' }}
          >
            {user.brand && <img alt="" className={styles.ident} src={'/images/icon_identification.png'} />}
          </div>
        }
        <div className={styles.info}>
          <span className={styles.name}>{user.name}</span><br />
          <span className={styles.des}>{user.brand && `认证：${user.brand}`}</span>
        </div>
        <span className={styles.tag} onClick={onDownLoadClick}>+ 关注</span>
      </div>
      <div className={styles.nav_box}>
        <ul className={styles.nav}>
          <li>
            <span className={styles.number}>{user.courseCount}</span><br />
            <span>课程</span>
          </li>
          <li>
            <span className={styles.number}>{user.fansCount}</span><br />
            <span>粉丝</span>
          </li>
          <li>
            <span className={styles.number}>{user.attentionsCount}</span><br />
            <span>关注</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Header
