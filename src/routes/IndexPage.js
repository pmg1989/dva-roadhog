import React from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import { NavBar, Icon } from 'antd-mobile'

const Index = () => {
  return (
    <div>
      <NavBar leftContent="back"
        mode="light"
        onLeftClick={() => console.log('onLeftClick')}
        rightContent={<Icon key="0" type="search" />}
      >
        <Link to={'bbs/index'}>To BBS Index</Link>
      </NavBar>
    </div>
  )
}

export default connect()(Index)
