import React from 'react'
import { connect } from 'dva'
import Content from './Content'
import ReplayList from './ReplayList'
import Bottom from './Bottom'

const PracticeWork = ({ dispatch, festivalPracticeWork }) => {
  const { item, dataSource, total, hasMore } = festivalPracticeWork

  const contentProps = {
    item,
  }

  const replayListProps = {
    dataSource,
    total,
    hasMore,
    queryMoreList() {
      dispatch({ type: 'festivalPracticeWork/queryMoreReplayList' })
    },
  }

  return (
    <div>
      <Content {...contentProps} />
      <ReplayList {...replayListProps} />
      <Bottom />
    </div>
  )
}

export default connect(({ festivalPracticeWork }) => ({ festivalPracticeWork }))(PracticeWork)
