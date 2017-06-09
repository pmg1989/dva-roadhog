import React from 'react'
import { connect } from 'dva'
import { Header } from 'NbComponent'
import { routerRedux } from 'dva/router'
import Content from './Content'
// import ReplayList from './ReplayList'
// import Footer from './Footer'

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

  // const replayListProps = {
  //   sendid,
  //   token,
  //   dataSource,
  //   total,
  //   hasMore,
  //   userId: user.id,
  //   queryMoreList() {
  //     dispatch({ type: 'bbsDetail/queryMoreReplayList' })
  //   },
  //   changeOrderBy(orderby) {
  //     dispatch({ type: 'bbsDetail/changeOrderBy', payload: { orderby } })
  //   },
  //   likeReplay({ fellowid }) {
  //     dispatch({ type: 'bbsDetail/likeReplay', payload: { fellowid } })
  //   },
  //   unlikeReplay({ fellowid }) {
  //     dispatch({ type: 'bbsDetail/unlikeReplay', payload: { fellowid } })
  //   },
  //   linkToReplay({ fellowid }) {
  //     dispatch(routerRedux.push({
  //       pathname: `/replay?replay_id=${fellowid}&sendid=${sendid}&token=${token}`,
  //     }))
  //   },
  //   deleteReplay({ fellowid }) {
  //     dispatch({ type: 'bbsDetail/deleteReplay', payload: { fellowid } })
  //   },
  // }
  //
  // const footerProps = {
  //   share,
  //   token,
  //   sendid,
  //   item,
  //   like() {
  //     dispatch({ type: 'bbsDetail/like' })
  //   },
  //   unlike() {
  //     dispatch({ type: 'bbsDetail/unlike' })
  //   },
  // }

  return (
    <div style={{ paddingBottom: 65 }}>
      <Header>更多回复</Header>
      <Content {...contentProps} />
      {/* <ReplayList {...replayListProps} />
      <Footer {...footerProps} /> */}
    </div>
  )
}

export default connect(({ bbsMoreReplay, app: { user } }) => ({ bbsMoreReplay, user }))(MoreReplay)
