import { routerRedux } from 'dva/router'
import { queryString } from 'utils/tools'
import { addReplay } from '../../services/bbs/replay'

export default {
  namespace: 'bbsReplay',
  state: {
    send: queryString('sendid'),
    bbsCid: '',
    parentFellowId: queryString('fellowid') || '',
    parentUser: queryString('userid'),
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
