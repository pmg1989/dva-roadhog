import React, { PropTypes } from 'react'
import classnames from 'classnames'
import { Icon } from 'antd-mobile'
import styles from './Empty.less'

const Empty = ({ children, icon = 'cry' }) => (
  <div className={classnames('flex-box', styles.empty_box)}>
    <div className={styles.box}>
      <Icon type={require(`../../svg/${icon}.svg`)} className={styles.empty_icon} />
      {children}
    </div>
  </div>
)

Empty.propTypes = {
  children: PropTypes.element.isRequired,
  icon: PropTypes.string,
}

export default Empty
