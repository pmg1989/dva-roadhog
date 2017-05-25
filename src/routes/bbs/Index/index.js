import React, { PropTypes } from 'react'
import { connect } from 'dva'
import Header from './Header'
import Nav from './Nav'

// import $ from 'jQuery'
// import iScroll from 'iScroll'
// import IR from 'iScrollRefresh'

const Index = ({ dispatch, location, bbsIndex }) => {
  const { query: { token } } = location
  const { categories, navOpen } = bbsIndex

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

  return (
    <div>
      <Header {...headerProps} />
      <Nav {...navProps} />
    </div>
  )
}

Index.propTypes = {
  bbsIndex: PropTypes.object.isRequired,
}

export default connect(({ bbsIndex }) => ({ bbsIndex }))(Index)
