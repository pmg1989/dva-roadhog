import pathToRegexp from 'path-to-regexp'
import { getDetail, getReplayList } from '../../services/bbs/detail'

export default {
  namespace: 'bbsDetail',
  state: {
    item: {},
    isLoading: false,
    sendid: null,
    page: 1,
    count: 10,
    hasMore: true,
    dataSource: [],
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        const match = pathToRegexp('/bbs/detail/:id').exec(location.pathname)
        if (match) {
          const id = match[1]
          dispatch({ type: 'queryDetail', payload: { id } })
          dispatch({ type: 'queryReplayList', payload: { id } })
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
    *queryReplayList({ payload }, { call, put, select }) {
      const { count } = yield select(state => state.bbsDetail)
      const data = yield call(getReplayList, {
        sendid: payload.id,
        orderby: 'dateAsc',
        page: 1,
        count,
      })
      if (data.success) {
        yield put({ type: 'queryReplayListSuccess', payload: { dataSource: data.fellows, page: 2, sendid: payload.id, hasMore: data.fellows.length < +data.count } })
      }
    },
    *queryMoreReplayList({ payload }, { call, put, select }) {
      const { sendid, page, count } = yield select(state => state.bbsDetail)
      const data = yield call(getReplayList, {
        sendid,
        orderby: 'dateAsc',
        page,
        count,
      })
      if (data.success) {
        const hasMore = ((page - 1) * count) + data.fellows.length < +data.count
        yield put({ type: 'queryMoreReplayListSuccess', payload: { dataSource: data.fellows, page: page + 1, hasMore } })
      }
    },
  },
  reducers: {
    queryDetailSuccess(state, action) {
      return { ...state, ...action.payload }
    },
    queryReplayListSuccess(state, action) {
      return { ...state, ...action.payload }
    },
    queryMoreReplayListSuccess(state, action) {
      const { dataSource, page, hasMore } = action.payload
      return { ...state, dataSource: [...state.dataSource, ...dataSource], page, hasMore }
    },
  },
}
