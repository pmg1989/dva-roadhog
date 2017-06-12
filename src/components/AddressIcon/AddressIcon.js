import React from 'react'
import classnames from 'classnames'
import { Icon } from 'antd-mobile'
import styles from './AddressIcon.less'

const AddressIcon = ({ place, usercity }) => (
  <span className={classnames(place ? styles.place : styles.place_gray)}>
    {!!place && <span><Icon type={require('../../svg/like.svg')} /></span>}
    {!!place && <span className={styles.place_str}>{place}</span>}
    {!place && <span className={styles.place_gray}>{usercity}</span>}
  </span>
)

export default AddressIcon
