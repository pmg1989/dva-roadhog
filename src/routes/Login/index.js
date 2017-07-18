import React from 'react'
import { connect } from 'dva'
import LoginForm from './LoginForm'

const Login = () => {
  return (
    <LoginForm />
  )
}

export default connect(({ login }) => ({ login }))(Login)
