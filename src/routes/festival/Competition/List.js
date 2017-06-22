import React from 'react'
// import classnames from 'classnames'
import { Tabs, Icon, Button } from 'antd-mobile'
import { ViewList } from 'NbComponent'
import styles from './List.less'

const TabPane = Tabs.TabPane

const Rank = ({ rank }) => {
  return (
    <span className={styles.rank}>
      <Icon type={require(`../../../svg/festival/No.${rank + 1}.svg`)} />
    </span>
  )
}

const Repeat = ({ modal: { dataSource, hasMore }, queryMore, type }) => {
  const Row = (item, sectionID, rowID) => {
    return (
      <div className={styles.list_row} key={rowID}>
        <div className={styles.top}>
          <img className={styles.thumb} alt="" src={item.userimg} />
          <div className={styles.mask_box}>
            <span>{item.content}</span>
          </div>
          {type === 1 && <Rank rank={+rowID} />}
          {type === 2 && <div className={styles.tag}><span>第二期</span></div>}
        </div>
        <div className={styles.bottom}>
          <div className={styles.vote_icon}>
            <span className={styles.icon}><Icon type={require('../../../svg/festival/vote.svg')} /></span>
            <span>12</span>
          </div>
          <Button className={styles.btn_vote}>投票</Button>
        </div>
      </div>
    )
  }

  const viewListProps = {
    dataSource,
    hasMore,
    queryMoreList: queryMore,
    Row,
    className: styles.list,
  }

  return <ViewList {...viewListProps} />
}

const List = ({ rank, newest, queryMoreRankList, queryNewestList, queryMoreNewestList }) => {
  const handleTabChange = (key) => {
    if (key === '2' && !newest.firstLoad) {
      queryNewestList()
    }
  }

  return (
    <div className={styles.list_box}>
      <Tabs defaultActiveKey="1" swipeable={false} onChange={handleTabChange}>
        <TabPane tab="本期榜单" key="1">
          <Repeat modal={rank} queryMore={queryMoreRankList} type={1} />
        </TabPane>
        <TabPane tab="最近上传" key="2">
          <Repeat modal={newest} queryMore={queryMoreNewestList} type={2} />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default List
