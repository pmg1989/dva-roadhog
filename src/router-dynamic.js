import React from 'react'
import { Router } from 'dva/router'

const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
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
