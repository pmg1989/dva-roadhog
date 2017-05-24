import React from 'react'
import { connect } from 'dva'
import Header from './Header'
import Nav from './Nav'

const Index = ({ location }) => {
  const { query: { token } } = location

  return (
    <div>
      <Header token={token} />
      <Nav />
    </div>
  )
}

export default connect()(Index)
