import React, { Component } from 'react'
import { List, InputItem, Button } from 'antd-mobile'
import classnames from 'classnames'
import { createForm } from 'rc-form'
import styles from './LoginForm.less'

const Item = List.Item

class LoginForm extends Component {
  render() {
    const { getFieldProps } = this.props.form

    return (
      <div className={classnames('content', styles.content)}>
        <List className={styles.login_box} renderHeader={() => <h2 className={styles.title}>登录</h2>}>
          <InputItem {...getFieldProps('phone')} type="phone" placeholder="请输入手机号码" />
          <InputItem {...getFieldProps('password')} type="password" placeholder="请输入密码" />
          <Item>
            <Button className={styles.submit} type="primary">提交验证</Button>
          </Item>
        </List>

      </div>
    )
  }
}

export default createForm()(LoginForm)
