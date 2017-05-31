import React, { PropTypes } from 'react'
import { Link } from 'dva/router'
import { Flex } from 'antd-mobile'
import classnames from 'classnames'
import QueueAnim from 'rc-queue-anim'
import styles from './Nav.less'

const Item = Flex.Item

const Nav = ({ list, token, navOpen, navHeight }) => {
  return (
    <div className={styles['nav-box']}>
      <QueueAnim appear={false} duration={500} animConfig={{ height: [navHeight, 0] }}>
        {navOpen ?
        [<div id="navTop" key='1' className={classnames(styles['nav-top'], { close: !navOpen })}>
        <Flex>
          {list && list.map((item, key) => {
            const id = item.cid === 0 ? item.alias : item.cid
            return (
              <Item key={key}>
                <Link to={`/bbs/category?id=${id}&token=${token}`}><img alt={item.name} src={item.image_url} /></Link>
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
