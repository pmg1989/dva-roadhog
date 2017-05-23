import React from 'react'
import { Router, Route } from 'dva/router'
// import App from './routes/App'

function RouterConfig({ history }) {
  return (
    <Router history={history} component={require('./routes/App')}>
      <Route path="/" component={require('./routes/bbs/Index')} />
      <Route path="bbs/index" component={require('./routes/bbs/Index')} />
      <Route path="bbs/detail" component={require('./routes/bbs/Detail')} />
      <Route path="*" component={require('./routes/Error')} />
    </Router>
  )
}
export default RouterConfig

// const registerModel = (app, model) => {
//   if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
//     app.model(model)
//   }
// }
//
// export default function({history, app}) {
//
//   const routes = [
//     {
//       path: '/',
//       component: App,
//       // onEnter: redirectToLogin,
//       getIndexRoute(nextState, cb) {
//         require.ensure([], require => {
//           registerModel(app, require('./models/bbs/index'))
//           cb(null, {component: require('./routes/bbs/Index')})
//         }, 'bbs-index')
//       },
//       childRoutes: [
//         {
//           path: 'bbs/index',
//           getComponent (nextState, cb) {
//             require.ensure([], require => {
//               registerModel(app, require('./models/bbs/index'))
//               cb(null, {component: require('./routes/bbs/Index')})
//             }, 'bbs-index')
//           },
//         }
//       ]
//     },
//     //*
//     {
//       path: '*',
//       name: 'error',
//       getComponent(nextState, cb) {
//         require.ensure([], require => {
//           cb(null, require('./routes/Error'))
//         }, 'error')
//       }
//     }
//   ]
//
//   return <Router history={history} routes={routes}/>
// }
