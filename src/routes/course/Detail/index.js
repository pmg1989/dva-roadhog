import React from 'react'
import { connect } from 'dva'
import Content from './Content'
import Bottom from './Bottom'

const Detail = ({ location, courseDetail }) => {
  const { item, recommendList } = courseDetail
  const { query: { share, token } } = location

  const contentProps = {
    token,
    item,
    recommendList,
    onDownLoadClick() {
      goToDownLoad()
    },
  }

  const bottomProps = {
    onDownLoadClick() {
      goToDownLoad()
    },
  }

  return (
    <div>
      <Content {...contentProps} />
      { share === '1' && <Bottom {...bottomProps} /> }
    </div>
  )
}

export default connect(({ courseDetail }) => ({ courseDetail }))(Detail)
