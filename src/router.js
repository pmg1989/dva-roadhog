import React from 'react'
import { Router, Route, IndexRoute } from 'dva/router'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={require('./routes/App')}>
        <IndexRoute component={require('./routes/bbs/Index')} />
        <Route path="bbs/index" component={require('./routes/bbs/Index')} />
        <Route path="bbs/category" component={require('./routes/bbs/Category')} />
        <Route path="bbs/detail" component={require('./routes/bbs/Detail')} />
        <Route path="bbs/add" component={require('./routes/bbs/Add')} />
        <Route path="*" component={require('./routes/Error')} />
      </Route>
    </Router>
  )
}
export default RouterConfig
