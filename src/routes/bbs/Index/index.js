import React, { PropTypes } from 'react'
import { connect } from 'dva'
import Header from './Header'
import Nav from './Nav'
import Content from './Content'

const Index = ({ dispatch, location, bbsIndex }) => {
  const { query: { token } } = location
  const { categories, navOpen, loading, latest, hot, near } = bbsIndex

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
  }

  const contentProps = {
    loading,
    latest,
    hot,
    near,
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
