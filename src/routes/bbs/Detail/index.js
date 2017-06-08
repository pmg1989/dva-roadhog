import React from 'react'
import { connect } from 'dva'
import HeaderPopup from './HeaderPopup'
import Content from './Content'
import ReplayList from './ReplayList'
import Footer from './Footer'

const Detail = ({ dispatch, location, bbsDetail }) => {
  const { query: { token } } = location
  const { sendid, item, dataSource, total, hasMore } = bbsDetail

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
    likeReplay({ fellowid }) {
      dispatch({ type: 'bbsDetail/likeReplay', payload: { fellowid } })
    },
    unlikeReplay({ fellowid }) {
      dispatch({ type: 'bbsDetail/unlikeReplay', payload: { fellowid } })
    },
  }

  const footerProps = {
    token,
    sendid,
    item,
  }

  return (
    <div style={{ paddingBottom: 65 }}>
      <HeaderPopup />
      <Content {...contentProps} />
      <ReplayList {...replayListProps} />
      <Footer {...footerProps}/>
    </div>
  )
}

export default connect(({ bbsDetail }) => ({ bbsDetail }))(Detail)
