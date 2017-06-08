import pathToRegexp from 'path-to-regexp'
import { getDetail, getReplayList } from '../../services/bbs/detail'
import { like, unlike } from '../../services/bbs/base'

export default {
  namespace: 'bbsDetail',
  state: {
    item: {},
    isLoading: false,
    sendid: null,
    page: 1,
    count: 10,
    hasMore: true,
    total: 0,
    orderby: 'dateAsc',
    dataSource: [],
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        const match = pathToRegexp('/bbs/detail/:id').exec(location.pathname)
        if (match) {
          const id = match[1]
          dispatch({ type: 'queryDetail', payload: { id } })
        }
      })
    },
  },
  effects: {
    *queryDetail({ payload }, { call, put }) {
      const data = yield call(getDetail, payload.id)
      if (data.success) {
        yield put({ type: 'queryDetailSuccess', payload: { item: data.bbssend[0] } })
        yield put({ type: 'queryReplayList', payload: { id: payload.id } })
      }
    },
    *changeOrderBy({ payload }, { put, select }) {
      const { sendid } = yield select(state => state.bbsDetail)
      yield put({ type: 'changeOrderBySuccess', payload })
      yield put({ type: 'queryReplayList', payload: { id: sendid } })
    },
    *queryReplayList({ payload }, { call, put, select }) {
      const { count, orderby } = yield select(state => state.bbsDetail)
      const data = yield call(getReplayList, {
        sendid: payload.id,
        orderby,
        page: 1,
        count,
      })
      if (data.success) {
        yield put({ type: 'queryReplayListSuccess',
          payload: {
            dataSource: data.fellows,
            page: 2,
            total: +data.count,
            sendid: payload.id,
            hasMore: data.fellows.length < +data.count,
          },
        })
      }
    },
    *queryMoreReplayList({ payload }, { call, put, select }) {
      const { sendid, page, count, orderby } = yield select(state => state.bbsDetail)
      const data = yield call(getReplayList, {
        sendid,
        orderby,
        page,
        count,
      })
      if (data.success) {
        const hasMore = ((page - 1) * count) + data.fellows.length < +data.count
        yield put({ type: 'queryMoreReplayListSuccess',
          payload: {
            dataSource: data.fellows,
            page: page + 1,
            hasMore,
          },
        })
      }
    },
    *likeReplay({ payload }, { call, put, select }) {
      const { fellowid } = payload
      const { sendid } = yield select(state => state.bbsDetail)

      yield put({ type: 'likeReplaySuccess', payload: { fellowid } })

      yield call(like, {
        sendagree: {
          fellowid,
          sendid,
        },
      })
    },
    *unlikeReplay({ payload }, { call, put, select }) {
      const { fellowid } = payload
      const { sendid } = yield select(state => state.bbsDetail)

      yield put({ type: 'unlikeReplaySuccess', payload: { fellowid } })

      yield call(unlike, {
        sendagree: {
          fellowid,
          sendid,
        },
      })
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
    changeOrderBySuccess(state, action) {
      const { orderby } = action.payload
      return { ...state, orderby }
    },
    likeReplaySuccess(state, action) {
      const { fellowid } = action.payload
      const dataSource = state.dataSource.map(item => (item.bbsfellowid === fellowid ? { ...item, like: '1', hearttimes: +item.hearttimes + 1 } : item))
      return { ...state, dataSource }
    },
    unlikeReplaySuccess(state, action) {
      const { fellowid } = action.payload
      const dataSource = state.dataSource.map(item => (item.bbsfellowid === fellowid ? { ...item, like: '0', hearttimes: +item.hearttimes - 1 } : item))
      return { ...state, dataSource }
    },
  },
}
