import React from 'react'
import { Flex, Icon } from 'antd-mobile'
import { Link } from 'dva/router'
import { Header } from 'NbComponent'
import styles from './Header.less'

const IndexHeader = ({ token, navOpen, onSwitchNav }) => {
  const headerProps = {
    leftContent: null,
    className: styles['nb-navbar-index'],
    iconName: navOpen ? require('../../../svg/cancel.svg') : require('../../../svg/classify.svg'),
    onLeftClick: onSwitchNav,
    rightContent: (
      <Link to={`/bbs/add?token=${token}`} className="flex-box">
        <Flex><Icon type={require('../../../svg/release.svg')} /></Flex>
        <Flex className="navbar-right-content">发帖</Flex>
      </Link>
    ),
  }

  return (
    <Header {...headerProps}>社区</Header>
  )
}

export default IndexHeader
