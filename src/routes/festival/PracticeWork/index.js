import React from 'react'
import { connect } from 'dva'
import Content from './Content'
// import ReplayList from './ReplayList'
// import Bottom from './Bottom'

const PracticeWork = ({ festivalCompetitionWork }) => {
  const { item } = festivalCompetitionWork

  const contentProps = {
    item,
  }

  // const replayListProps = {
  //   dataSource,
  //   total,
  //   hasMore,
  //   queryMoreList() {
  //     dispatch({ type: 'festivalCompetitionWork/queryMoreReplayList' })
  //   },
  // }

  return (
    <div>
      <Content {...contentProps} />
      {/* <ReplayList {...replayListProps} />
      <Bottom /> */}
    </div>
  )
}

export default connect(({ festivalCompetitionWork }) => ({ festivalCompetitionWork }))(PracticeWork)
