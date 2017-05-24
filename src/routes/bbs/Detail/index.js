import React from 'react'
import { connect } from 'dva'
import HeaderPopup from './HeaderPopup'

const Detail = () => {
  // const { query: { token } } = location

  return (
    <div>
      <HeaderPopup />
    </div>
  )
}

export default connect()(Detail)
