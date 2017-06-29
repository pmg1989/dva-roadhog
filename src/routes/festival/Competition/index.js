import React from 'react'
import { connect } from 'dva'
import Content from './Content'
import List from './List'
import Bottom from './Bottom'

const Competition = ({ dispatch, festivalCompetition }) => {
  const { item, rank, newest } = festivalCompetition

  const onDownLoadClick = () => {
    goToDownLoad()
  }

  const contentProps = {
    item,
    onDownLoadClick,
  }

  const listProps = {
    rank,
    newest,
    onDownLoadClick,
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

  const bottomProps = {
    expired: item.vote_status === 3,
    onDownLoadClick,
  }

  return (
    <div>
      <Content {...contentProps} />
      <List {...listProps} />
      <Bottom {...bottomProps} />
    </div>
  )
}

export default connect(({ festivalCompetition }) => ({ festivalCompetition }))(Competition)
