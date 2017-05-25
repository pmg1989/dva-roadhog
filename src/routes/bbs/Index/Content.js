import React from 'react'
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

const Content = ({ loading, latest, hot }) => {
  return (
    <div className={styles.content}>
      <div id="ir-tabs-wrapper">
        <div className="ir-tabs-scroller">
          <a className="active">最新</a>
          <a>热门</a>
          {/* <a href="javascript:;">酒店资讯</a> */}
        </div>
      </div>
      <div style={{ clear: 'both' }} />
      <div id="ir-bd-wrapper">
        <div className="ir-bd-scroller">
          <div className="ir-wrapper">
            <ul className="ir-scroller">
              {latest && latest.map((item, key) => {
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
              <Loading loading={loading[0]} />
            </ul>
          </div>
          <div className="ir-wrapper">
            <ul className="ir-scroller">
              {hot && hot.map((item, key) => {
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
              <Loading loading={loading[1]} />
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Content
