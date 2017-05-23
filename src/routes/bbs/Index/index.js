import React from 'react'
import { connect } from 'dva'
import { Flex, Icon } from 'antd-mobile'
import { Header } from '../../../components'

const Index = () => {
  const headerProps = {
    // leftContent: null,
    iconName: require('../../../svg/classify.svg'),
    onLeftClick: () => {
      console.log(1)
    },
    rightContent: (
      <Flex>
        <Flex><Icon type={require('../../../svg/release.svg')} /></Flex>
        <Flex className="navbar-right-content">发帖</Flex>
      </Flex>
    ),
  }

  return (
    <div>
      <Header headerProps={headerProps}>
        bbsIndex
      </Header>
    </div>
  )
}

export default connect()(Index)
