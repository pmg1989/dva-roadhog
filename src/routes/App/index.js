import React, { PropTypes } from 'react'
import { connect } from 'dva'
import './App.less'

const App = ({ children }) => {
  return (
    <div>{children}</div>
  )
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  // location: PropTypes.object.isRequired,
  // dispatch: PropTypes.func.isRequired,
  // app: PropTypes.object,
  // loading: PropTypes.object,
}

export default connect(({ app }) => ({ app }))(App)
