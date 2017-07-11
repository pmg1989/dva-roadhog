import React from 'react'
import { connect } from 'dva'
import { Flex } from 'antd-mobile'
import { Header } from 'NbComponent'
import Content from './Content'

const Add = ({ dispatch, bbsAdd }) => {
  const { categories, selected, item } = bbsAdd

  const header1Props = {
    rightContent: (
      <Flex>
        <Flex className="navbar-right-content" onClick={() => {
          dispatch({ type: 'bbsAdd/addSend' })
        }}
        >发布</Flex>
      </Flex>
    ),
  }

  const header2Props = {
    onLeftClick() {
      dispatch({ type: 'bbsAdd/back' })
    },
  }

  const contentProps = {
    categories,
    selected,
    item,
    onShowCategory() {
      dispatch({ type: 'bbsAdd/showCategory' })
    },
    onSelected({ cid, name }) {
      dispatch({ type: 'bbsAdd/selected', payload: { cid, name } })
    },
    onTextChange({ key, value }) {
      dispatch({ type: 'bbsAdd/textChange', payload: { key, value } })
    },
  }

  return (
    <div>
      {!selected && <Header {...header1Props}>发布帖子</Header>}
      {selected && <Header {...header2Props}>选择分类</Header>}
      <Content {...contentProps} />
    </div>
  )
}

export default connect(({ bbsAdd }) => ({ bbsAdd }))(Add)
