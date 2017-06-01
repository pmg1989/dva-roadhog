import React from 'react'
import { Flex } from 'antd-mobile'
import { Header } from '../../../components'

const CategoryHeader = () => {
  // const { query: { token } } = location

  const headerProps = {
    rightContent: (
      <Flex>
        <Flex className="navbar-right-content">发布</Flex>
      </Flex>
    ),
  }

  return (
    <Header {...headerProps}>发布帖子</Header>
  )
}

export default CategoryHeader
