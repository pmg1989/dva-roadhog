import React from 'react'
import { connect } from 'dva'
import { Flex, Icon } from 'antd-mobile'
import { Header } from '../../../components'

const Add = () => {
  // const { query: { token } } = location

  const headerProps = {
    rightContent: (
      <Flex>
        <Flex><Icon type={require('../../../svg/more.svg')} /></Flex>
      </Flex>
    ),
  }

  return (
    <div>
      <Header {...headerProps}>帖子详情</Header>
    </div>
  )
}

export default connect()(Add)
