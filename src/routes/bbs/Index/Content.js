import React from 'react'
import classnames from 'classnames'
import ListView from '../ListView'
import styles from './Content.less'

const Content = ({ loading, list, tab, token, linkTo, like, unlike }) => {
  return (
    <div className={styles.content}>
      <div id="ir-tabs-wrapper">
        <div className="ir-tabs-scroller">
          <a className={classnames({ active: tab === 0 })}><span>最新</span></a>
          <a className={classnames({ active: tab === 1 })}><span>热门</span></a>
          <a className={classnames({ active: tab === 2 })}><span>附近</span></a>
        </div>
      </div>
      <div id="ir-bd-wrapper">
        <div className="ir-bd-scroller">
          <ListView token={token} list={list[0]} tab={0} loading={loading[0]} linkTo={linkTo} like={like} unlike={unlike} />
          <ListView token={token} list={list[1]} tab={1} loading={loading[1]} linkTo={linkTo} like={like} unlike={unlike} />
          <ListView token={token} list={list[2]} tab={2} loading={loading[2]} linkTo={linkTo} like={like} unlike={unlike} />
        </div>
      </div>
    </div>
  )
}

export default Content
