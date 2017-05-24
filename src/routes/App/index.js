import React, { PropTypes } from 'react'
import { connect } from 'dva'
import styles from './App.less'
import '../../themes/index.less'

const App = ({ children }) => {
  return (
    <div className={styles.wrap}>
      {children}
    </div>
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
