import React from 'react'
import { Header, Empty } from 'NbComponent'

const Error = () => {
  return (
    <div>
      <Header>404 Not Found</Header>
      <Empty>
        <p>抱歉您访问的页面不存在</p>
      </Empty>
    </div>
  )
}

export default Error
