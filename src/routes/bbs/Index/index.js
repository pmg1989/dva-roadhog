import React from 'react'
import { connect } from 'dva'
import {routerRedux} from 'dva/router'
import { NavBar, Icon } from 'antd-mobile'

const Index = ({ dispatch }) => {

  const back = () => {
    dispatch(routerRedux.goBack())
  }

  return (
    <div>
      <NavBar leftContent="back"
        mode="light"
        onLeftClick={back}
        rightContent={<Icon key="0" type="search" />}>
        bbsIndex
      </NavBar>
    </div>
  )
}

export default connect()(Index)
