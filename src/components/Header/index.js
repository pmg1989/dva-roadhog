import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { NavBar } from 'antd-mobile'
import './Header.less'

const Header = ({ dispatch, children, headerProps }) => {
  const handleBack = () => {
    dispatch(routerRedux.goBack())
  }

  const navBarProps = {
    leftContent: '返回',
    iconName: require('../../svg/back.svg'),
    mode: 'dark',
    onLeftClick: handleBack,
    ...headerProps,
  }

  return (
    <div>
      <NavBar {...navBarProps}>
        {children}
      </NavBar>
    </div>
  )
}

Header.propTypes = {
  children: PropTypes.string.isRequired,
  headerProps: PropTypes.object,
}

export default connect()(Header)
