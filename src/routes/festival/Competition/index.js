import React from 'react'
import { connect } from 'dva'
import Content from './Content'
import List from './List'
import Bottom from './Bottom'

const Competition = () => (
  <div>
    <Content />
    <List />
    <Bottom />
  </div>
)

export default connect()(Competition)
