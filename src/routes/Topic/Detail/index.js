import React from 'react'
import { connect } from 'dva'
import Content from './Content'
import Footer from './Footer'

const Detail = ({ location, topicDetail }) => {
  const { item } = topicDetail
  const { query: { share } } = location

  const contentProps = {
    item,
  }

  const footerProps = {
    onDownLoadClick() {
      goToDownLoad()
    },
  }

  return (
    <div>
      <Content {...contentProps} />
      { share === '1' && <Footer {...footerProps} /> }
    </div>
  )
}

export default connect(({ topicDetail }) => ({ topicDetail }))(Detail)
