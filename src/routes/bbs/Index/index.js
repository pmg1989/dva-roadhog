import React, { PropTypes } from 'react'
import { connect } from 'dva'
import Header from './Header'
import Nav from './Nav'

const Index = ({ location, bbsIndex }) => {
  const { query: { token } } = location
  const { categories } = bbsIndex
  const navProps = {
    list: categories,
    token,
  }

  return (
    <div>
      <Header token={token} />
      <Nav {...navProps} />
    </div>
  )
}

Index.propTypes = {
  bbsIndex: PropTypes.object.isRequired,
}

export default connect(({ bbsIndex }) => ({ bbsIndex }))(Index)
