import React, { PropTypes } from 'react'
import { connect } from 'dva'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './App.less'

const App = ({ children, location: { pathname }, app }) => {
  const key = pathname
  const { type } = app

  return (
    <ReactCSSTransitionGroup
      component="div" transitionName={type}
      transitionEnterTimeout={450} transitionLeaveTimeout={450}
    >
      { children && React.cloneElement(children, { key })}
    </ReactCSSTransitionGroup>
  )
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  //location: PropTypes.object.isRequired,
  //dispatch: PropTypes.func.isRequired,
  // app: PropTypes.object,
  // loading: PropTypes.object,
}

export default connect(({ app }) => ({ app }))(App)
