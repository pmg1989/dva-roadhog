import React from 'react'
import { connect } from 'dva'
import classnames from 'classnames'
import { Flex } from 'antd-mobile'
import { Header } from 'NbComponent'
import { hideMenu } from 'utils/app'
import Content from './Content'
import styles from './Content.less'

const Add = ({ dispatch, location, bbsAdd }) => {
  const { debug } = location.query
  const { categories, headerStatus, item } = bbsAdd

  // 显示话题页面(发布帖子), APP自定义键盘端调用
  window.showTopic = function() {
    faceHide() // 显示话题页面(发布帖子)时，隐藏QQ表情
    hideMenu()
    dispatch({ type: 'bbsAdd/showTopic' })
  }

  const addStatus = !!item.bbsCategory.cid && !!item.title.length && item.content.length > 8

  const handleAdd = () => {
    addStatus && dispatch({ type: 'bbsAdd/addSend' })
  }

  const handleTopicOk = () => {
    dispatch({ type: 'bbsAdd/back' })
  }

  const header1Props = {
    rightContent: (
      <Flex>
        <Flex className="navbar-right-content">
          <span className={classnames({ [styles.disabled]: !addStatus })} onClick={handleAdd}>发布</span>
        </Flex>
      </Flex>
    ),
  }

  const header2Props = {
    onLeftClick() {
      dispatch({ type: 'bbsAdd/back' })
    },
  }

  const header3Props = {
    onLeftClick() {
      dispatch({ type: 'bbsAdd/back' })
    },
    rightContent: (
      <Flex>
        <Flex className="navbar-right-content">
          <span className={classnames({ [styles.disabled]: !item.bbslabel.length })} onClick={handleTopicOk}>确定</span>
        </Flex>
      </Flex>
    ),
  }

  const contentProps = {
    categories,
    headerStatus,
    item,
    debug,
    onShowCategory() {
      dispatch({ type: 'bbsAdd/showCategory' })
    },
    onSelected({ cid, name }) {
      dispatch({ type: 'bbsAdd/selected', payload: { cid, name } })
    },
    onTextChange({ key, value }) {
      dispatch({ type: 'bbsAdd/textChange', payload: { key, value } })
    },
    onAddressChange({ place, latitude, longitude }) {
      dispatch({ type: 'bbsAdd/addressChange', payload: { place, latitude, longitude } })
    },
  }

  return (
    <div>
      {headerStatus === 'add' && <Header {...header1Props}>发布帖子</Header>}
      {headerStatus === 'categories' && <Header {...header2Props}>选择分类</Header>}
      {headerStatus === 'topic' && <Header {...header3Props}>插入话题</Header>}
      <Content {...contentProps} />
    </div>
  )
}

export default connect(({ bbsAdd }) => ({ bbsAdd }))(Add)
