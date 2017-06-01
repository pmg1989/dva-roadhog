import React from 'react'
import { Router } from 'dva/router'

// function RouterConfig({ history }) {
//   return (
//     <Router history={history}>
//       <Route path="/" component={require('./routes/App')}>
//         <IndexRoute component={require('./routes/bbs/Index')} />
//         <Route path="bbs/index" component={require('./routes/bbs/Index')} />
//         <Route path="bbs/category" component={require('./routes/bbs/Category')} />
//         <Route path="bbs/detail" component={require('./routes/bbs/Detail')} />
//         <Route path="bbs/add" component={require('./routes/bbs/Add')} />
//         <Route path="*" component={require('./routes/Error')} />
//       </Route>
//     </Router>
//   )
// }
// export default RouterConfig

// const registerModel = (app, model) => {
//   if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
//     app.model(model)
//   }
// }

const cached = {}
function registerModel(app, model) {
  if (!cached[model.namespace]) {
    app.model(model)
    cached[model.namespace] = 1
  }
}

const Routers = ({ history, app }) => {
  const routes = [
    {
      path: '/',
      component: require('./routes/App'),
      // onEnter: redirectToLogin,
      getIndexRoute(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/bbs/index'))
          cb(null, { component: require('./routes/bbs/Index') })
        }, 'bbs-index')
      },
      childRoutes: [
        {
          path: 'bbs/index',
          name: 'bbs/index',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/bbs/index'))
              cb(null, require('./routes/bbs/Index'))
            }, 'bbs-index')
          },
        },
        {
          path: 'bbs/category',
          name: 'bbs/category',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/bbs/category'))
              cb(null, require('./routes/bbs/Category'))
            }, 'bbs-category')
          },
        },
        {
          path: '*',
          name: 'error',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/Error'))
            }, 'error')
          },
        },
      ],
    },
  ]

  return <Router history={history} routes={routes} />
}

export default Routers
