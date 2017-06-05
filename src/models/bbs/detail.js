import pathToRegexp from 'path-to-regexp'
import { getDetail } from '../../services/bbs/detail'

export default {
  namespace: 'bbsDetail',
  state: {
    item: {},

  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        const match = pathToRegexp('/bbs/detail/:id').exec(location.pathname)
        if (match) {
          dispatch({ type: 'queryDetail', payload: { id: match[1] } })
        }
      })
    },
  },
  effects: {
    *queryDetail({ payload }, { call, put }) {
      const data = yield call(getDetail, payload.id)
      if (data.success) {
        yield put({ type: 'queryDetailSuccess', payload: { item: data.bbssend[0] } })
      }
    },
  },
  reducers: {
    queryDetailSuccess(state, action) {
      return { ...state, ...action.payload }
    },
  },
}
