import React, { Component } from 'react'
import { Link } from 'dva/router'
import { Flex, Icon } from 'antd-mobile'
import QueueAnim from 'rc-queue-anim'
import { Header } from 'NbComponent'
import { queryString, getCategoryImage } from 'utils/tools'
import styles from './Header.less'

class CategoryHeader extends Component {

  componentWillUnmount() {
    this.props.openNav()
  }

  render() {
    const { category, token, navOpen, navHeight } = this.props

    const headerProps = {
      className: navOpen && styles.transparent,
      rightContent: (
        <Link to={`/bbs/add?token=${token}`} className="flex-box">
          <Flex><Icon type={require('../../../svg/release.svg')} /></Flex>
          <Flex className="navbar-right-content">发帖</Flex>
        </Link>
      ),
    }

    return (
      <div id="categoryHeader" className={styles.header}>
        <QueueAnim appear={false} duration={500} animConfig={{ height: [navHeight, 0] }}>
          {navOpen ?
          [
            <div key="1">
              <img className={styles.navImg} src={getCategoryImage(queryString('cid'))} alt={category.name} />
            </div>,
          ] : null
          }
        </QueueAnim>
        <Header {...headerProps}>{category.name || ''}</Header>
      </div>
    )
  }
}

export default CategoryHeader
