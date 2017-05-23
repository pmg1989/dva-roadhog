import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Flex, NavBar, Icon } from 'antd-mobile'
import './Header.less'

const Header = ({ dispatch, children, headerProps = { right: {} } }) => {
  const { onLeftClick, right: { icon, text } } = headerProps

  const handleBack = () => {
    dispatch(routerRedux.goBack())
  }

  const navBarProps = {
    leftContent: '返回',
    mode: 'dark',
    onLeftClick: onLeftClick || handleBack,
    rightContent: (
      <Flex>
        {icon && <Flex><Icon type={icon} /></Flex>}
        {text && <Flex className="navbar-right-content">{text}</Flex>}
      </Flex>
    ),
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
