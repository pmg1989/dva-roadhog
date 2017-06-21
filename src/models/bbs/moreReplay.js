import { getMoreReplay } from '../../services/bbs/moreReplay'
import { like, unlike, deleteSendFellow } from '../../services/bbs/base'

export default {
  namespace: 'bbsMoreReplay',
  state: {
    item: {},
    sendid: '',
    fellowid: '',
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
        const { pathname, query: { sendid, fellowid } } = location
        if (pathname === '/bbs/more-replay') {
          dispatch({ type: 'app/queryUser' })
          dispatch({ type: 'queryReplayList', payload: { sendid, fellowid } })
        }
      })
    },
  },
  effects: {
    *queryReplayList({ payload }, { call, put, select }) {
      const { sendid, fellowid } = payload
      const { count, orderby } = yield select(state => state.bbsMoreReplay)
      const data = yield call(getMoreReplay, {
        fellowid,
        sendid,
        orderby,
        page: 1,
        count,
      })
      if (data.success) {
        yield put({ type: 'queryMoreReplaySuccess',
          payload: {
            item: data.fellow_info,
            dataSource: data.fellows,
            page: 2,
            total: +data.count,
            sendid,
            fellowid,
            hasMore: data.fellows.length < +data.count,
          },
        })
      }
    },
    *queryMoreReplayList({ payload }, { call, put, select }) {
      const { sendid, fellowid, page, count, orderby } = yield select(state => state.bbsMoreReplay)
      const data = yield call(getMoreReplay, {
        fellowid,
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
    *changeOrderBy({ payload }, { put, select }) {
      const { sendid, fellowid } = yield select(state => state.bbsMoreReplay)
      yield put({ type: 'changeOrderBySuccess', payload })
      yield put({ type: 'queryReplayList', payload: { sendid, fellowid } })
    },
    *likeReplay({ payload }, { call, put, select }) {
      const { sendid, fellowid } = yield select(state => state.bbsMoreReplay)

      yield put({ type: 'likeReplaySuccess' })

      yield call(like, {
        sendagree: {
          fellowid,
          sendid,
        },
      })
    },
    *unlikeReplay({ payload }, { call, put, select }) {
      const { sendid, fellowid } = yield select(state => state.bbsMoreReplay)

      yield put({ type: 'unlikeReplaySuccess' })

      yield call(unlike, {
        sendagree: {
          fellowid,
          sendid,
        },
      })
    },
    *likeReplayList({ payload }, { call, put, select }) {
      const { fellowid, isLike } = payload
      const { sendid } = yield select(state => state.bbsMoreReplay)

      yield put({ type: 'likeReplayListSuccess', payload: { fellowid, isLike } })

      yield call(isLike ? like : unlike, {
        sendagree: {
          fellowid,
          sendid,
        },
      })
    },
    *deleteReplayList({ payload }, { call, put }) {
      const { fellowid } = payload
      const data = yield call(deleteSendFellow, fellowid)
      if (data.success) {
        yield put({ type: 'deleteReplayListSuccess', payload: { fellowid } })
      }
    },
  },
  reducers: {
    queryMoreReplaySuccess(state, action) {
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
    likeReplaySuccess(state) {
      const { item } = state
      return { ...state, item: { ...item, like: '1', hearttimes: +item.hearttimes + 1 } }
    },
    unlikeReplaySuccess(state) {
      const { item } = state
      return { ...state, item: { ...item, like: '0', hearttimes: +item.hearttimes - 1 } }
    },
    likeReplayListSuccess(state, action) {
      const { fellowid, isLike } = action.payload
      const dataSource = state.dataSource.map(item => (item.bbsfellowid === fellowid ? { ...item, like: isLike ? '1' : '0', hearttimes: isLike ? (+item.hearttimes + 1) : (+item.hearttimes - 1) } : item))
      return { ...state, dataSource }
    },
    deleteReplayListSuccess(state, action) {
      const { fellowid } = action.payload
      const dataSource = state.dataSource.filter(item => item.bbsfellowid !== fellowid)
      return { ...state, dataSource }
    },
  },
}
