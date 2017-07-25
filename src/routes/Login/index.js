import React from 'react'
import { connect } from 'dva'
import { Header } from 'NbComponent'
import LoginForm from './LoginForm'

const Login = () => {
  return (
    <div>
      <Header>登录</Header>
      <LoginForm />
    </div>
  )
}

export default connect(({ login }) => ({ login }))(Login)
