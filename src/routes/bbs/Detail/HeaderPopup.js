import React, { Component } from 'react'
import { Flex, Icon } from 'antd-mobile'
import classnames from 'classnames'
import { Header } from '../../../components'
import styles from './HeaderPopup.less'

const Popup = ({ open }) => {
  return (
    <div className={classnames(styles.popup, styles.active)}>
      <Flex className={styles.box}>
        <Flex><Icon type={require('../../../svg/share.svg')} /></Flex>
        <Flex className={styles['popup-text']}>分享{open}</Flex>
      </Flex>
      <Flex className={styles.box}>
        <Flex><Icon type={require('../../../svg/share.svg')} /></Flex>
        <Flex className={styles['popup-text']}>举报</Flex>
      </Flex>
      <Flex className={styles.box}>
        <Flex><Icon type={require('../../../svg/share.svg')} /></Flex>
        <Flex className={styles['popup-text']}>删除</Flex>
      </Flex>
    </div>
  )
}

class HeaderPopup extends Component {

  state = {
    popupStatus: false,
  }

  handlePopupStatus() {
    this.setState(nextState => ({ popupStatus: !nextState.popupStatus }))
  }

  render() {
    const { popupStatus } = this.state

    const headerProps = {
      rightContent: (
        <Flex>
          <Flex onClick={::this.handlePopupStatus}><Icon type="ellipsis" /></Flex>
          <Popup open={popupStatus} />
        </Flex>
      ),
    }

    return (
      <div>
        <Header {...headerProps}>帖子详情</Header>
      </div>
    )
  }
}

export default HeaderPopup
