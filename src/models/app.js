import { getUser } from '../services/bbs/app'

export default {
  namespace: 'app',
  state: {
    type: 'slide',
    user: {},
  },
  subscriptions: {
    // setup({ dispatch, history }) {
    // },
  },
  effects: {
    *queryUser({ payload }, { call, put, select }) {
      const { user } = yield select(state => state.app)
      if (!user.id) {
        const data = yield call(getUser)
        if (data.success) {
          yield put({ type: 'queryUserSuccess', payload: { user: data.user } })
        }
      }
    },
  },
  reducers: {
    pageTransition(state, action) {
      const { type } = action.payload
      return { ...state, type }
    },
    queryUserSuccess(state, action) {
      const { user } = action.payload
      return { ...state, user }
    },
  },
}
