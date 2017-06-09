import utils from 'utils'
import { getDetail, getMoreReplay, deleteSend } from '../../services/bbs/moreReplay'
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
  },
  reducers: {
    queryMoreReplaySuccess(state, action) {
      return { ...state, ...action.payload }
    },
    likeReplaySuccess(state) {
      const { item } = state
      return { ...state, item: { ...item, like: '1', hearttimes: +item.hearttimes + 1 } }
    },
    unlikeReplaySuccess(state) {
      const { item } = state
      return { ...state, item: { ...item, like: '0', hearttimes: +item.hearttimes - 1 } }
    },
  },
}
