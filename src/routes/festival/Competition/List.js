import React from 'react'
// import classnames from 'classnames'
import { Tabs, Icon, Button } from 'antd-mobile'
import styles from './List.less'

const TabPane = Tabs.TabPane

const List = () => {
  function callback(key) {
    console.log('onChange', key)
  }

  function handleTabClick(key) {
    console.log('onTabClick', key)
  }

  return (
    <div className={styles.list_box}>
      <Tabs defaultActiveKey="1" onChange={callback} onTabClick={handleTabClick} swipeable={false}>
        <TabPane tab="本期榜单" key="1">
          <ul className={styles.list}>
            <li>
              <div className={styles.top}>
                <img className={styles.thumb} alt="" src="http://res.cakeland.com/item/米奇系列（优酪慕斯）/260x260/4.png" />
                <div className={styles.mask_box}>
                  <span>Jasson</span>
                </div>
                <span className={styles.rank} />
              </div>
              <div className={styles.bottom}>
                <div className={styles.vote_icon}>
                  <span className={styles.icon}><Icon type={require('../../../svg/lock.svg')} /></span>
                  <span>12</span>
                </div>
                <Button className={styles.btn_vote}>投票</Button>
              </div>
            </li>
          </ul>
        </TabPane>
        <TabPane tab="最近上传" key="2">
          <ul className={styles.list}>
            <li>
              <div className={styles.top}>
                <img className={styles.thumb} alt="" src="http://res.cakeland.com/item/米奇系列（优酪慕斯）/260x260/4.png" />
                <div className={styles.mask_box}>
                  <span>Jasson</span>
                </div>
                <span className={styles.rank} />
              </div>
              <div className={styles.bottom}>
                <div className={styles.vote_icon}>
                  <span className={styles.icon}><Icon type={require('../../../svg/lock.svg')} /></span>
                  <span>16</span>
                </div>
                <Button className={styles.btn_vote}>投票</Button>
              </div>
            </li>
          </ul>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default List
