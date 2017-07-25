import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Header } from 'NbComponent'
import Content from './Content'

const MySend = ({ dispatch, location, bbsMySend }) => {
  const { query: { token } } = location
  const { loading, list } = bbsMySend

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
        type: 'bbsMySend/like',
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

MySend.propTypes = {
  bbsMySend: PropTypes.object.isRequired,
}

export default connect(({ bbsMySend }) => ({ bbsMySend }))(MySend)
