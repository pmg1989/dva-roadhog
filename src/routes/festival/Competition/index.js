import React from 'react'
import { connect } from 'dva'
import Content from './Content'
import List from './List'
import Bottom from './Bottom'

const Competition = ({ dispatch, festivalCompetition }) => {
  const { item, rank, newest } = festivalCompetition

  const contentProps = {
    item,
  }

  const listProps = {
    rank,
    newest,
    queryMoreRankList() {
      dispatch({ type: 'festivalCompetition/queryMoreRankList' })
    },
    queryNewestList() {
      dispatch({ type: 'festivalCompetition/queryNewestList' })
    },
    queryMoreNewestList() {
      dispatch({ type: 'festivalCompetition/queryMoreNewestList' })
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
