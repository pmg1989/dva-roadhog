import React from 'react'
import { connect } from 'dva'
import { Header } from 'NbComponent'
import { routerRedux } from 'dva/router'
import Content from './Content'
import ReplayList from './ReplayList'
import Footer from './Footer'

const MoreReplay = ({ dispatch, location, bbsMoreReplay, user }) => {
  const { query: { token } } = location
  const { sendid, item, dataSource, total, hasMore } = bbsMoreReplay

  const contentProps = {
    sendid,
    token,
    item,
    like({ fellowid, isLike }) {
      dispatch({ type: 'bbsMoreReplay/like', payload: { fellowid, isLike } })
    },
  }

  const replayListProps = {
    sendid,
    token,
    dataSource,
    total,
    hasMore,
    userId: user.id,
    queryMoreList() {
      dispatch({ type: 'bbsMoreReplay/queryMoreReplayList' })
    },
    changeOrderBy(orderby) {
      dispatch({ type: 'bbsMoreReplay/changeOrderBy', payload: { orderby } })
    },
    likeReplay({ fellowid, isLike }) {
      dispatch({ type: 'bbsMoreReplay/likeReplay', payload: { fellowid, isLike } })
    },
    linkToReplay({ userName, userid }) {
      const fellowid = bbsMoreReplay.fellowid
      dispatch(routerRedux.push({
        pathname: '/bbs/replay',
        query: {
          fellowid, sendid, userid, userName, token,
        },
      }))
    },
    deleteReplay({ fellowid }) {
      dispatch({ type: 'bbsMoreReplay/deleteReplayList', payload: { fellowid } })
    },
  }

  const footerProps = {
    token,
    sendid,
    item,
  }

  return (
    <div style={{ paddingBottom: 65 }}>
      <Header>更多回复</Header>
      <Content {...contentProps} />
      <ReplayList {...replayListProps} />
      <Footer {...footerProps} />
    </div>
  )
}

export default connect(({ bbsMoreReplay, app: { user } }) => ({ bbsMoreReplay, user }))(MoreReplay)
