import React from 'react'
import { connect } from 'dva'
import HeaderPopup from './HeaderPopup'
import Content from './Content'

const Detail = ({ location, bbsDetail }) => {
  const { query: { token } } = location
  const { item } = bbsDetail

  const contentProps = {
    token,
    item,
  }

  return (
    <div>
      <HeaderPopup />
      <Content {...contentProps} />
    </div>
  )
}

export default connect(({ bbsDetail }) => ({ bbsDetail }))(Detail)
