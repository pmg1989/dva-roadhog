import React, { PropTypes } from 'react'
import { connect } from 'dva'
import Header from './Header'
import Content from './Content'

const Category = ({ location, bbsCategory }) => {
  const { query: { token } } = location
  const { loading, list, navOpen, navHeight, category } = bbsCategory

  const headerProps = {
    navOpen,
    category,
    navHeight,
    token,
  }

  const contentProps = {
    loading,
    list,
    token,
    navOpen,
  }

  return (
    <div>
      <Header {...headerProps} />
      <Content {...contentProps} />
    </div>
  )
}

Category.propTypes = {
  bbsCategory: PropTypes.object.isRequired,
}

export default connect(({ bbsCategory }) => ({ bbsCategory }))(Category)
