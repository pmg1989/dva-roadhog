import React from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { NavBar, Icon } from 'antd-mobile'

const Detail = ({ dispatch }) => {
  const back = () => {
    dispatch(routerRedux.goBack())
  }

  return (
    <div>
      <NavBar leftContent="back"
        mode="light"
        onLeftClick={back}
        rightContent={<Icon key="0" type="search" />}
      >
        bbsDetail
      </NavBar>
    </div>
  )
}

export default connect()(Detail)
