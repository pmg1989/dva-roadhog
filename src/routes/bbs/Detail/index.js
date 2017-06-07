import React from 'react'
import { connect } from 'dva'
import HeaderPopup from './HeaderPopup'
import Content from './Content'
import ReplayList from './ReplayList'
import Footer from './Footer'

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
    like({ fellowid }) {
      dispatch({ type: 'bbsDetail/like', payload: { fellowid } })
    },
    unlike({ fellowid }) {
      dispatch({ type: 'bbsDetail/unlike', payload: { fellowid } })
    },
  }

  return (
    <div style={{ paddingBottom: 65 }}>
      <HeaderPopup />
      <Content {...contentProps} />
      <ReplayList {...replayListProps} />
      <Footer />
    </div>
  )
}

export default connect(({ bbsDetail }) => ({ bbsDetail }))(Detail)
