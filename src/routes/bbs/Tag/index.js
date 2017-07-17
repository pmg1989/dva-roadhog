import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { routerRedux, Link } from 'dva/router'
import { Flex, Icon } from 'antd-mobile'
import { Header } from 'NbComponent'
import Content from './Content'

const Tag = ({ dispatch, location, bbsTag }) => {
  const { query: { token } } = location
  const { loading, list, name } = bbsTag

  const headerProps = {
    rightContent: (
      <Link to={`/bbs/add?token=${token}`} className="flex-box">
        <Flex><Icon type={require('../../../svg/release.svg')} /></Flex>
        <Flex className="navbar-right-content">发帖</Flex>
      </Link>
    ),
  }

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
        type: 'bbsTag/like',
        payload: { sendid, isLike },
      })
    },
  }

  return (
    <div>
      <Header {...headerProps}>{name}</Header>
      <Content {...contentProps} />
    </div>
  )
}

Tag.propTypes = {
  bbsTag: PropTypes.object.isRequired,
}

export default connect(({ bbsTag }) => ({ bbsTag }))(Tag)
