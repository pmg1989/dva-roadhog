import React from 'react'
import { Link } from 'dva/router'
import { Flex } from 'antd-mobile'
import styles from './Nav.less'

const Item = Flex.Item

const Nav = () => {
  return (
    <div className={styles['nav-box']}>
      <div className={styles['nav-top']}>
        <Flex>
          <Item>
            <Link to={'/bbs/category/1?token=123'}><img alt="" src="https://o9u2lnvze.qnssl.com/upload/ee6d3e361107f6599004333ef47f14e9.png?1493267874" /></Link>
          </Item>
          <Item>
            <Link to={'/bbs/category/1?token=123'}><img alt="" src="https://o9u2lnvze.qnssl.com/upload/ee6d3e361107f6599004333ef47f14e9.png?1493267874" /></Link>
          </Item>
        </Flex>
      </div>
      <div className={styles['nav-bottom']}>
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
      </div>
    </div>
  )
}

export default Nav
