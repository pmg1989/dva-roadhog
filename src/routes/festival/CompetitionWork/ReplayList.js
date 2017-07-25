import React from 'react'
import classnames from 'classnames'
import { renderDate, renderContent } from 'utils/tools'
import { ViewList } from 'NbComponent'
import styles from './ReplayList.less'

const ReplayList = ({ dataSource, total, hasMore, queryMoreList }) => {
  const Header = () => (
    <div className={classnames('flex-box', styles.header)}>
      <div className="flex-item">
        评论&nbsp;(<span>{total}</span>)
      </div>
    </div>
  )

  const Row = (item, sectionID, rowID) => {
    return (
      <div key={rowID} className="list-view-row">
        <div className={styles.info}>
          <div className={styles.thumb_box}>
            <img src={item.userimg} alt={item.username} />
            <span className={styles.name}>{item.username}</span>
          </div>
          <span className={styles.date}>{renderDate(item.senddate)}</span>
        </div>
        <div className={styles.text}
          dangerouslySetInnerHTML={{ __html: renderContent(item.content) }}
        />
      </div>
    )
  }

  const viewListProps = {
    dataSource,
    hasMore,
    queryMoreList,
    Header,
    Row,
    className: styles.replay_list,
    footerMsg: {
      empty: <p>暂无评论~</p>,
      noMore: '没有更多评论了哦~',
    },
  }

  return <ViewList {...viewListProps} />
}

export default ReplayList
