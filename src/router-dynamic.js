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
          path: 'bbs',
          childRoutes: [
            {
              path: 'index',
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/bbs/index'))
                  cb(null, require('./routes/bbs/Index'))
                }, 'bbs-index')
              },
            },
            {
              path: 'category',
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/bbs/category'))
                  cb(null, require('./routes/bbs/Category'))
                }, 'bbs-category')
              },
            },
            {
              path: 'tag',
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/bbs/tag'))
                  cb(null, require('./routes/bbs/Tag'))
                }, 'bbs-tag')
              },
            },
            {
              path: 'detail/:sendid',
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/bbs/detail'))
                  cb(null, require('./routes/bbs/Detail'))
                }, 'bbs-detail')
              },
            },
            {
              path: 'add',
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/bbs/add'))
                  cb(null, require('./routes/bbs/Add'))
                }, 'bbs-add')
              },
            },
            {
              path: 'more-replay',
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/bbs/moreReplay'))
                  cb(null, require('./routes/bbs/MoreReplay'))
                }, 'bbs-more-replay')
              },
            },
            {
              path: 'replay',
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/bbs/replay'))
                  cb(null, require('./routes/bbs/Replay'))
                }, 'bbs-replay')
              },
            },
          ],
        },
        {
          path: 'festival',
          childRoutes: [
            {
              path: 'competition/:id',
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/festival/competition'))
                  cb(null, require('./routes/festival/Competition'))
                }, 'festival-competition')
              },
            },
            {
              path: 'competition-work/:id',
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/festival/competitionWork'))
                  cb(null, require('./routes/festival/CompetitionWork'))
                }, 'festival-competition-work')
              },
            },
            {
              path: 'practice-work/:id',
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/festival/practiceWork'))
                  cb(null, require('./routes/festival/PracticeWork'))
                }, 'festival-practice-work')
              },
            },
          ],
        },
      ],
    },
    {
      path: 'video.html',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('./routes/bbs/Video'))
        }, 'bbs-video')
      },
    },
    {
      path: 'audio.html',
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
