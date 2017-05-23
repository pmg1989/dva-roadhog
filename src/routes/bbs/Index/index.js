import React from 'react'
import { connect } from 'dva'
import { Header } from '../../../components'

const Index = () => {
  const headerProps = {
    onLeftClick: () => {
      console.log(1)
    },
    right: {
      icon: 'search',
      text: '新增',
    },
  }

  return (
    <div>
      <Header headerProps={headerProps}>bbsIndex</Header>
    </div>
  )
}

export default connect()(Index)
