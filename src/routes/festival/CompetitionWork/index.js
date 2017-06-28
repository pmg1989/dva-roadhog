import React from 'react'
import { connect } from 'dva'
import Content from './Content'
import ReplayList from './ReplayList'
import Bottom from './Bottom'

const CompetitionWork = ({ dispatch, festivalCompetitionWork }) => {
  const { item, dataSource, total, hasMore } = festivalCompetitionWork

  const onDownLoadClick = () => {
    goToDownLoad()
  }

  const contentProps = {
    item,
    onDownLoadClick,
  }

  const replayListProps = {
    dataSource,
    total,
    hasMore,
    queryMoreList() {
      dispatch({ type: 'festivalCompetitionWork/queryMoreReplayList' })
    },
  }

  const bottomProps = {
    onDownLoadClick,
  }

  return (
    <div>
      <Content {...contentProps} />
      <ReplayList {...replayListProps} />
      <Bottom {...bottomProps} />
    </div>
  )
}

export default connect(({ festivalCompetitionWork }) => ({ festivalCompetitionWork }))(CompetitionWork)
