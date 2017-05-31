import React, { PropTypes } from 'react'
import { Link } from 'dva/router'
import { Flex } from 'antd-mobile'
import classnames from 'classnames'
import styles from './Nav.less'

const Item = Flex.Item

const Nav = ({ list, token, navOpen }) => {
  return (
    <div className={styles['nav-box']}>
      <div className={classnames(styles['nav-top'], { close: !navOpen })}>
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
      </div>
      {/* <div className={styles['nav-bottom']}>
        <Flex>
          <Item>
            <span className={styles.active}>最新</span>
          </Item>
          <Item>
            <span>热门</span>
          </Item>
          <Item>
            <span>附近</span>
          </Item>
        </Flex>
      </div> */}
    </div>
  )
}

Nav.propTypes = {
  list: PropTypes.array.isRequired,
  token: PropTypes.string.isRequired,
}

export default Nav
