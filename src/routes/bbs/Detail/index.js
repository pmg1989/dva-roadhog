import React from 'react'
import { connect } from 'dva'
import HeaderPopup from './HeaderPopup'
import Content from './Content'
import ReplayList from './ReplayList'

const Detail = ({ dispatch, location, bbsDetail }) => {
  const { query: { token } } = location
  const { item, dataSource, hasMore } = bbsDetail

  const contentProps = {
    token,
    item,
  }

  const replayListProps = {
    dataSource,
    hasMore,
    queryMoreList() {
      dispatch({ type: 'bbsDetail/queryMoreReplayList' })
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
