import React, { PropTypes } from 'react'
import { Link } from 'dva/router'
import { Flex } from 'antd-mobile'
import classnames from 'classnames'
import QueueAnim from 'rc-queue-anim'
import { appRedirect } from 'utils/tools'
import styles from './Nav.less'

const Item = Flex.Item

const Nav = ({ list, token, navOpen, navHeight }) => {
  return (
    <div className={styles['nav-box']}>
      <QueueAnim appear duration={500} animConfig={{ marginTop: [0, -navHeight] }}>
        {navOpen ?
        [<div id="navTop" key="1" className={classnames(styles['nav-top'], { close: !navOpen })}>
          <Flex>
            {list && list.map((item, key) => {
              const id = item.cid === 0 ? item.alias : item.cid
              const src = item.cid === 0 ? '/images/chat_en.png' : item.image_url
              return (
                <Item key={key}>
                  <Link onClick={appRedirect} to={`/bbs/category?cid=${id}&token=${token}`}><img alt={item.name} src={src} /></Link>
                </Item>
              )
            })}
          </Flex>
        </div>] : null }
      </QueueAnim>
    </div>
  )
}

Nav.propTypes = {
  list: PropTypes.array.isRequired,
  token: PropTypes.string.isRequired,
}

export default Nav
