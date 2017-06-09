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
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/bbs/index'))
              cb(null, require('./routes/bbs/Index'))
            }, 'bbs-index')
          },
        },
        {
          path: 'bbs/category',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/bbs/category'))
              cb(null, require('./routes/bbs/Category'))
            }, 'bbs-category')
          },
        },
        {
          path: 'bbs/detail/:sendid',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/bbs/detail'))
              cb(null, require('./routes/bbs/Detail'))
            }, 'bbs-detail')
          },
        },
        {
          path: 'bbs/more-replay',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/bbs/moreReplay'))
              cb(null, require('./routes/bbs/MoreReplay'))
            }, 'bbs-more-replay')
          },
        },
      ],
    },
    {
      path: 'video',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('./routes/bbs/Video'))
        }, 'bbs-video')
      },
    },
    {
      path: 'audio',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('./routes/bbs/Audio'))
        }, 'bbs-video')
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
  ]

  return <Router history={history} routes={routes} />
}

export default Routers
