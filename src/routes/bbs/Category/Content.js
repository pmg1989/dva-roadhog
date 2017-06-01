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

const handleClick = (item) => {
  console.log(item.bbs_sendid)
}

const List = ({ list, loading }) => {
  return (
    <div className="ir-wrapper">
      <ul className="ir-scroller">
        {list && list.map((item, key) => {
          return (
            <li key={key} className="clear-fix" onClick={() => handleClick(item)}>
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

const Content = ({ loading, list }) => {
  return (
    <div className={classnames('content', styles.content)}>
      <div id="ir-bd-wrapper">
        <div className="ir-bd-scroller">
          <List list={list} loading={loading} />
        </div>
      </div>
    </div>
  )
}

export default Content
