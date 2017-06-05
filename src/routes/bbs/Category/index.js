import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import Header from './Header'
import Content from './Content'

const Category = ({ dispatch, location, bbsCategory }) => {
  const { query: { token } } = location
  const { loading, list, navOpen, navHeight, category } = bbsCategory

  const headerProps = {
    navOpen,
    category,
    navHeight,
    token,
  }

  const contentProps = {
    loading,
    list,
    token,
    navOpen,
    linkTo(url) {
      dispatch(routerRedux.push({
        pathname: url,
      }))
    },
    like(params) {
      dispatch({
        type: 'bbsCategory/like',
        payload: params,
      })
    },
    unlike(params) {
      dispatch({
        type: 'bbsCategory/unlike',
        payload: params,
      })
    },
  }

  return (
    <div>
      <Header {...headerProps} />
      <Content {...contentProps} />
    </div>
  )
}

Category.propTypes = {
  bbsCategory: PropTypes.object.isRequired,
}

export default connect(({ bbsCategory }) => ({ bbsCategory }))(Category)
