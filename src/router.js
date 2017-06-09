import React from 'react'
import { Router, Route, IndexRoute } from 'dva/router'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={require('./routes/App')}>
        <IndexRoute component={require('./routes/bbs/Index')} />
        <Route path="bbs/index" component={require('./routes/bbs/Index')} />
        <Route path="bbs/category" component={require('./routes/bbs/Category')} />
        <Route path="bbs/detail/:sendid" component={require('./routes/bbs/Detail')} />
        <Route path="bbs/more-replay" component={require('./routes/bbs/MoreReplay')} />
        <Route path="bbs/add" component={require('./routes/bbs/Add')} />
        <Route path="audio" component={require('./routes/bbs/Audio')} />
        <Route path="video" component={require('./routes/bbs/Video')} />
        <Route path="*" component={require('./routes/Error')} />
      </Route>
    </Router>
  )
}
export default RouterConfig
