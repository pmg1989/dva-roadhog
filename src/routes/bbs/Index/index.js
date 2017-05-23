import React from 'react'
import { connect } from 'dva'
import Header from './Header'

const Index = ({ location }) => {
  const { query: { token } } = location

  return (
    <div>
      <Header token={token} />
    </div>
  )
}

export default connect()(Index)
