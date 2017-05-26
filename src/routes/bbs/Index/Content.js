import React from 'react'
import classnames from 'classnames'
import styles from './Content.less'

const Loading = ({ loading }) => {
  if (!loading) {
    return null
  }
  return (
    <li className="clear-fix">
      <div className="loader">
        <div className="line-scale">
          <div /><div /><div />
          <div /><div />
        </div>
        <div style={{ marginTop: '50px' }}>加载中...</div>
      </div>
    </li>
  )
}

const List = ({ list, loading }) => {
  return (
    <div className="ir-wrapper">
      <ul className="ir-scroller">
        {list && list.map((item, key) => {
          return (
            <li key={key} className="clear-fix">
              <img src={item.user_img} alt={item.title} />
              <div className="li-body">
                <h3>{item.title}</h3>
                <p>{item.user_name}</p>
              </div>
            </li>
          )
        })}
        <Loading loading={loading} />
      </ul>
    </div>
  )
}

const Content = ({ loading, list, tab }) => {
  return (
    <div className={styles.content}>
      <div id="ir-tabs-wrapper">
        <div className="ir-tabs-scroller">
          <a className={classnames({ active: tab === 0 })}>最新</a>
          <a className={classnames({ active: tab === 1 })}>热门</a>
          <a className={classnames({ active: tab === 2 })}>附近</a>
        </div>
      </div>
      <div style={{ clear: 'both' }} />
      <div id="ir-bd-wrapper">
        <div className="ir-bd-scroller">
          <List list={list[0]} loading={loading[0]} />
          <List list={list[1]} loading={loading[1]} />
          <List list={list[2]} loading={loading[2]} />
        </div>
      </div>
    </div>
  )
}

export default Content
