import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { NavBar } from 'antd-mobile'
import styles from './Header.less'

const Header = ({ dispatch, children, ...headerProps }) => {
  const handleBack = () => {
    dispatch({ type: 'app/pageTransition', payload: { type: 'slide-back' } })
    dispatch(routerRedux.goBack())
    setTimeout(() => {
      dispatch({ type: 'app/pageTransition', payload: { type: 'slide' } })
    }, 300)
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
        {children}
      </NavBar>
    </div>
  )
}

Header.propTypes = {
  children: PropTypes.string.isRequired,
  headerProps: PropTypes.object,
}

export default connect()(Header)
