import React from 'react'
import { Link } from 'dva/router'
import { Flex, Icon } from 'antd-mobile'
import { Header } from '../../../components'

const CategoryHeader = ({ category, token }) => {

  const headerProps = {
    rightContent: (
      <Link to={`/bbs/add?token=${token}`} className="flex-box">
        <Flex><Icon type={require('../../../svg/release.svg')} /></Flex>
        <Flex className="navbar-right-content">发帖</Flex>
      </Link>
    ),
  }

  return (
    <Header {...headerProps}>{category.name || ''}</Header>
  )
}

export default CategoryHeader
