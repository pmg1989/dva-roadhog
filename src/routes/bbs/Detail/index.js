import React from 'react'
import { connect } from 'dva'
import HeaderPopup from './HeaderPopup'
import Content from './Content'
import ReplayList from './ReplayList'

const Detail = ({ dispatch, location, bbsDetail }) => {
  const { query: { token } } = location
  const { item, dataSource, total, hasMore } = bbsDetail

  const contentProps = {
    token,
    item,
  }

  const replayListProps = {
    dataSource,
    total,
    hasMore,
    queryMoreList() {
      dispatch({ type: 'bbsDetail/queryMoreReplayList' })
    },
    changeOrderBy(orderby) {
      dispatch({ type: 'bbsDetail/changeOrderBy', payload: { orderby } })
    },
  }

  return (
    <div>
      <HeaderPopup />
      <Content {...contentProps} />
      <ReplayList {...replayListProps} />
    </div>
  )
}

export default connect(({ bbsDetail }) => ({ bbsDetail }))(Detail)
