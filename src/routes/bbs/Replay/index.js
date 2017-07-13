import React from 'react'
import { connect } from 'dva'
import classnames from 'classnames'
import { Flex } from 'antd-mobile'
import { Header, Editable } from 'NbComponent'
import styles from './index.less'

const Replay = ({ dispatch, bbsReplay }) => {
  const { item } = bbsReplay

  const addStatus = !!item.content.length

  const handleReplay = () => {
    addStatus && dispatch({ type: 'bbsAdd/addSend' })
  }

  const headerProps = {
    rightContent: (
      <Flex>
        <Flex className="navbar-right-content">
          <span className={classnames({ [styles.disabled]: !addStatus })} onClick={handleReplay}>发布</span>
        </Flex>
      </Flex>
    ),
  }

  const editablePorps = {
    html: item.content,
    onChange(html) {
      dispatch({
        type: 'bbsReplay/textChange',
        payload: { key: 'content', value: html },
      })
    },
    onSetAddress(addr) {
      dispatch({
        type: 'bbsReplay/addressChange',
        payload: addr,
      })
    }
  }

  return (
    <div>
      <Header {...headerProps}>发布帖子</Header>
      <div className={classnames('content', styles.content)}>
        <Editable {...editablePorps} />
      </div>
    </div>
  )
}

export default connect(({ bbsReplay }) => ({ bbsReplay }))(Replay)
