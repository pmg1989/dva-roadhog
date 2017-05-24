import { query } from '../../services/bbs/index'

export default {
  namespace: 'bbsIndex',
  state: {
    navOpen: false,
    categories: [],
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        const pathname = location.pathname
        if (pathname === '/' || pathname === '/bbs/index') {
          dispatch({ type: 'query' })
        }
      })
    },
  },
  effects: {
    *query({ payload }, { call, put }) {
      const data = yield call(query)
      if (data.success) {
        yield put({ type: 'querySuccess', payload: { categories: data.categories } })
      }
    },
  },
  reducers: {
    querySuccess(state, action) {
      return { ...state, ...action.payload }
    },
    switchNav(state) {
      const { navOpen } = state
      return { ...state, navOpen: !navOpen }
    },
  },
}
