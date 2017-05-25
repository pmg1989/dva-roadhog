import React from 'react'
import styles from './Content.less'

const Content = ({ latest }) => {
  return (
    <div className={styles.content}>
      <div id="ir-tabs-wrapper">
        <div className="ir-tabs-scroller">
          <a className="active">行业资讯</a>
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
                  <li key={key}>
                    <img src={item.user_img} alt={item.title} />
                    <div className="li-body">
                      <h3>{item.title}</h3>
                      <p>{item.user_name}</p>
                    </div>
                  </li>
                )
              })}
              <li>
                <div className="loader">
                  <div className="line-scale">
                    <div /><div /><div />
                    <div /><div />
                  </div>
                  <div style={{ marginTop: '15px' }}>加载中...</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Content
