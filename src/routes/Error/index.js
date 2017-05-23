import React from 'react'
import { Result, Icon, WhiteSpace } from 'antd-mobile'

const Error = () => (
  <div>
    <WhiteSpace />
    <div className="sub-title">404 Not Found</div>
    <Result
      img={<Icon type={require('../../svg/cry.svg')} className="icon" />}
      title="404 Not Found"
      message={'啊哦~一不小心闯进了未知领域，请点击下面按钮返回首页......'}
    />
    <WhiteSpace />
  </div>
)

export default Error
