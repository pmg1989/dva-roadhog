import React from 'react'
import { connect } from 'dva'
import { Flex } from 'antd-mobile'
import { Header } from '../../../components'

const Add = () => {
  // const { query: { token } } = location

  const headerProps = {
    rightContent: (
      <Flex>
        <Flex className="navbar-right-content">发布</Flex>
      </Flex>
    ),
  }

  return (
    <div>
      <Header headerProps={headerProps}>发布帖子</Header>
    </div>
  )
}

export default connect()(Add)
