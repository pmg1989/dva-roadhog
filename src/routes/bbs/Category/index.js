import React, { PropTypes } from 'react'
import { connect } from 'dva'
import Header from './Header'
import Content from './Content'

const Category = ({ dispatch, location, bbsCategory }) => {
  const { query: { token } } = location
  const { loading, list, navOpen, category } = bbsCategory

  const headerProps = {
    navOpen,
    category,
    onSwitchNav() {
      dispatch({ type: 'bbsIndex/switchNav' })
    },
  }

  const contentProps = {
    loading,
    list,
    token,
  }

  return (
    <div>
      <Header {...headerProps}/>
      <Content {...contentProps} />
    </div>
  )
}

Category.propTypes = {
  bbsCategory: PropTypes.object.isRequired,
}

export default connect(({ bbsCategory }) => ({ bbsCategory }))(Category)
