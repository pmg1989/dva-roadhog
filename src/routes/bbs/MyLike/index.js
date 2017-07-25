import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Header } from 'NbComponent'
import Content from './Content'

const MyLike = ({ dispatch, location, bbsMyLike }) => {
  const { query: { token } } = location
  const { loading, list } = bbsMyLike

  const contentProps = {
    loading,
    list,
    token,
    linkTo({ sendid }) {
      dispatch(routerRedux.push({
        pathname: `/bbs/detail/${sendid}`,
        query: { token },
      }))
    },
    like({ sendid, isLike }) {
      dispatch({
        type: 'bbsMyLike/like',
        payload: { sendid, isLike },
      })
    },
  }

  return (
    <div>
      <Header>点过赞的帖子</Header>
      <Content {...contentProps} />
    </div>
  )
}

MyLike.propTypes = {
  bbsMyLike: PropTypes.object.isRequired,
}

export default connect(({ bbsMyLike }) => ({ bbsMyLike }))(MyLike)
