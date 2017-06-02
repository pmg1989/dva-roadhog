import React from 'react'
import { Result, Icon, WingBlank } from 'antd-mobile'
import { Header } from '../../components'

const Error = () => (
  <div>
    <Header>404 Not Found</Header>
    <WingBlank size="md">
      <Result
        img={<Icon type={require('../../svg/cry.svg')} className="icon" />}
        title="404 Not Found"
        message={'啊哦~一不小心闯进了未知领域，请点击下面按钮返回首页......'}
      />
    </WingBlank>
  </div>
)

export default Error
