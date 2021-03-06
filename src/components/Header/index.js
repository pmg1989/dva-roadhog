import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { NavBar } from 'antd-mobile'
import { isApp } from 'utils/tools'
import { returnback } from 'utils/app'
import styles from './Header.less'

const Header = ({ dispatch, children, ...headerProps }) => {
  const handleBack = () => {
    if (isApp) {
      returnback()
    } else {
      dispatch(routerRedux.goBack())
    }
  }

  const navBarProps = {
    leftContent: '返回',
    iconName: require('../../svg/back.svg'),
    mode: 'dark',
    onLeftClick: handleBack,
    ...headerProps,
  }

  return (
    <div className={styles['fixed-top']}>
      <NavBar {...navBarProps}>
        {children.length > 8 ? `${children.substr(0, 8)}...` : children}
      </NavBar>
    </div>
  )
}

Header.propTypes = {
  children: PropTypes.string.isRequired,
  headerProps: PropTypes.object,
}

export default connect()(Header)
