import React, { Component } from 'react'
import { Flex, Icon } from 'antd-mobile'
import { Link } from 'dva/router'
import { Header } from '../../../components'
import styles from './Header.less'

class IndexHeader extends Component {

  state = {
    open: true,
  }

  render() {
    const { token } = this.props
    const { open } = this.state

    const headerProps = {
      leftContent: null,
      className: styles['nb-navbar-index'],
      iconName: open ? require('../../../svg/cancel.svg') : require('../../../svg/classify.svg'),
      onLeftClick: () => {
        this.setState(nextState => ({ open: !nextState.open }))
      },
      rightContent: (
        <Link to={`/bbs/add?token=${token}`} className="flex-box">
          <Flex><Icon type={require('../../../svg/release.svg')} /></Flex>
          <Flex className="navbar-right-content">发帖</Flex>
        </Link>
      ),
    }

    return (
      <div>
        <Header headerProps={headerProps}>社区</Header>
      </div>
    )
  }
}

export default IndexHeader
