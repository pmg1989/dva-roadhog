import React from 'react'
import { connect } from 'dva'
import { Empty } from 'NbComponent'
import { routerRedux } from 'dva/router'
import HeaderPopup from './HeaderPopup'
import Content from './Content'
import ReplayList from './ReplayList'
import Footer from './Footer'

const Detail = ({ dispatch, location, bbsDetail, user }) => {
  const { query: { token, share } } = location
  const { sendid, item, dataSource, total, hasMore, sendStatus } = bbsDetail

  const headerProps = {
    item,
    sendStatus,
    showDelete: user.id === +item.user_id,
    deleteSend() {
      dispatch({ type: 'bbsDetail/deleteSend' })
    },
  }

  const contentProps = {
    token,
    item,
  }

  const replayListProps = {
    sendid,
    token,
    dataSource,
    total,
    hasMore,
    userId: user.id,
    queryMoreList() {
      dispatch({ type: 'bbsDetail/queryMoreReplayList' })
    },
    changeOrderBy(orderby) {
      dispatch({ type: 'bbsDetail/changeOrderBy', payload: { orderby } })
    },
    likeReplay({ fellowid, isLike }) {
      dispatch({ type: 'bbsDetail/likeReplay', payload: { fellowid, isLike } })
    },
    linkToReplay({ fellowid }) {
      dispatch(routerRedux.push({
        pathname: `/replay?replay_id=${fellowid}&sendid=${sendid}&token=${token}`,
      }))
    },
    deleteReplay({ fellowid }) {
      dispatch({ type: 'bbsDetail/deleteReplay', payload: { fellowid } })
    },
  }

  const footerProps = {
    share,
    token,
    sendid,
    item,
    like() {
      dispatch({ type: 'bbsDetail/like' })
    },
    unlike() {
      dispatch({ type: 'bbsDetail/unlike' })
    },
  }

  return (
    <div style={sendStatus === 1 ? { paddingBottom: 65 } : {}}>
      <HeaderPopup {...headerProps} />
      {sendStatus === 1 && <Content {...contentProps} />}
      {sendStatus === 1 && <ReplayList {...replayListProps} />}
      {sendStatus === 1 && <Footer {...footerProps} />}
      {sendStatus === 0 && <Empty><p>该帖子已被用户删除</p></Empty>}
    </div>
  )
}

export default connect(({ bbsDetail, app: { user } }) => ({ bbsDetail, user }))(Detail)
