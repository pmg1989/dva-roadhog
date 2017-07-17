import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import Header from './Header'
import Nav from './Nav'
import Content from './Content'

const Index = ({ dispatch, location, bbsIndex }) => {
  const { query: { token } } = location
  const { categories, navOpen, loading, list, tab, navHeight } = bbsIndex

  const headerProps = {
    token,
    navOpen,
    onSwitchNav() {
      dispatch({ type: 'bbsIndex/switchNav' })
    },
  }

  const navProps = {
    list: categories,
    token,
    navOpen,
    navHeight,
  }

  const contentProps = {
    loading,
    list,
    tab,
    token,
    linkTo({ sendid }) {
      dispatch(routerRedux.push({
        pathname: `/bbs/detail/${sendid}`,
        query: { token },
      }))
    },
    like({ sendid, isLike }) {
      dispatch({
        type: 'bbsIndex/like',
        payload: { sendid, isLike },
      })
    },
    unlike({ sendid, isLike }) {
      dispatch({
        type: 'bbsIndex/unlike',
        payload: { sendid, isLike },
      })
    },
  }

  return (
    <div>
      <Header {...headerProps} />
      <Nav {...navProps} />
      <Content {...contentProps} />
    </div>
  )
}

Index.propTypes = {
  bbsIndex: PropTypes.object.isRequired,
}

export default connect(({ bbsIndex }) => ({ bbsIndex }))(Index)
