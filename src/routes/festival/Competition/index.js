import React from 'react'
import { connect } from 'dva'
import Content from './Content'
// import List from './List'

const Competition = () => (
  <div>
    <Content />
    {/* <List /> */}
  </div>
)

export default connect()(Competition)
