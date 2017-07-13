import { routerRedux } from 'dva/router'
import utils from 'utils'
import { addReplay } from '../../services/bbs/replay'

export default {
  namespace: 'bbsReplay',
  state: {
    send: utils.queryString('sendid'),
    bbsCid: '',
    parentFellowId: utils.queryString('fellowid') || '',
    parentUser: utils.queryString('userid'),
  },
  subscriptions: {
    // setup({ history }) {
    //   history.listen((location) => {
    //     const { pathname } = location
    //     if (pathname === '/bbs/replay') {
    //     }
    //   })
    // },
  },
  effects: {
    *addReplay({ payload }, { call, put, select }) {
      const replayModal = yield select(state => state.bbsReplay)
      const data = yield call(addReplay, {
        fellow: {
          ...payload,
          ...replayModal,
        },
      })

      if (data.success) {
        yield put(routerRedux.goBack())
      }
    },
  },
  reducers: {
  },
}
