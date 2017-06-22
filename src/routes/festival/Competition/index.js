import React from 'react'
import { connect } from 'dva'
import Content from './Content'
import List from './List'
import Bottom from './Bottom'

const Competition = ({ dispatch, festivalCompetition }) => {
  const { item, dataSource, total, hasMore } = festivalCompetition

  const contentProps = {
    item,
  }

  const listProps = {
    dataSource,
    total,
    hasMore,
    queryMoreList() {
      dispatch({ type: 'festivalCompetition/queryMoreReplayList' })
    },
  }

  return (
    <div>
      <Content {...contentProps} />
      <List {...listProps} />
      <Bottom />
    </div>
  )
}

export default connect(({ festivalCompetition }) => ({ festivalCompetition }))(Competition)
