import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Header } from 'NbComponent'
import Content from './Content'

const OtherSend = ({ dispatch, location, bbsOtherSend }) => {
  const { query: { token } } = location
  const { loading, list } = bbsOtherSend

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
        type: 'bbsOtherSend/like',
        payload: { sendid, isLike },
      })
    },
  }

  return (
    <div>
      <Header>我发布的帖子</Header>
      <Content {...contentProps} />
    </div>
  )
}

OtherSend.propTypes = {
  bbsOtherSend: PropTypes.object.isRequired,
}

export default connect(({ bbsOtherSend }) => ({ bbsOtherSend }))(OtherSend)
