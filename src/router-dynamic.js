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
        // bbs
        {
          path: 'bbs',
          getIndexRoute(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/bbs/index'))
              cb(null, { component: require('./routes/bbs/Index') })
            }, 'bbs-index')
          },
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
            {
              path: 'hot-list',
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/bbs/hotList'))
                  cb(null, require('./routes/bbs/HotList'))
                }, 'bbs-hot-list')
              },
            },
            {
              path: 'my-send',
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/bbs/mySend'))
                  cb(null, require('./routes/bbs/MySend'))
                }, 'bbs-my-send')
              },
            },
            {
              path: 'my-like',
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/bbs/myLike'))
                  cb(null, require('./routes/bbs/MyLike'))
                }, 'bbs-my-like')
              },
            },
            {
              path: 'other-send',
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/bbs/otherSend'))
                  cb(null, require('./routes/bbs/OtherSend'))
                }, 'bbs-other-send')
              },
            },
            {
              path: 'other-like',
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/bbs/otherLike'))
                  cb(null, require('./routes/bbs/OtherLike'))
                }, 'bbs-other-like')
              },
            },
          ],
        },
        // festival
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
        // topic
        {
          path: 'topic/detail/:id',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/topic/detail'))
              cb(null, require('./routes/Topic/Detail'))
            }, 'topic-detail')
          },
        },
      ],
    },
    {
      path: 'video.html',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('./routes/bbs/Video'))
        }, 'video')
      },
    },
    {
      path: 'audio.html',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('./routes/bbs/Audio'))
        }, 'audio')
      },
    },
    {
      path: 'login',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/login'))
          cb(null, require('./routes/Login'))
        }, 'login')
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
