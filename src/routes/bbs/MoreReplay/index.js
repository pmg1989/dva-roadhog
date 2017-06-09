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
    likeReplay() {
      dispatch({ type: 'bbsMoreReplay/likeReplay' })
    },
    unlikeReplay() {
      dispatch({ type: 'bbsMoreReplay/unlikeReplay' })
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
    likeReplayList({ fellowid }) {
      dispatch({ type: 'bbsMoreReplay/likeReplayList', payload: { fellowid } })
    },
    unlikeReplayList({ fellowid }) {
      dispatch({ type: 'bbsMoreReplay/unlikeReplayList', payload: { fellowid } })
    },
    linkToReplay({ fellowid }) {
      dispatch(routerRedux.push({
        pathname: `/replay?fellowid=${fellowid}&sendid=${sendid}&token=${token}`,
      }))
    },
    deleteReplayList({ fellowid }) {
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