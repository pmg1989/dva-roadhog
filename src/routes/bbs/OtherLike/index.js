import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Header } from 'NbComponent'
import Content from './Content'

const OtherLike = ({ dispatch, location, bbsOtherLike }) => {
  const { query: { token } } = location
  const { loading, list } = bbsOtherLike

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
        type: 'bbsOtherLike/like',
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

OtherLike.propTypes = {
  bbsOtherLike: PropTypes.object.isRequired,
}

export default connect(({ bbsOtherLike }) => ({ bbsOtherLike }))(OtherLike)
