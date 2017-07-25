import { contentHeight } from 'utils/app'
import { getList } from '../../services/bbs/index'
import { like, unlike } from '../../services/bbs/base'

const pageSize = 3

export default {
  namespace: 'bbsHotList',
  state: {
    list: [],
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        // const { pathname, query: { cat } } = location
        const { pathname } = location
        if (pathname === '/bbs/hot-list') {
          dispatch({
            type: 'queryList',
            // payload: { cid: env === 'production' ? (dicCategory[cat] || cat) : cat }
          })
        }
      })
    },
  },
  effects: {
    *queryList({ payload }, { call, put }) {
      // const { cid } = payload
      const data = yield call(getList, {
        // cat: cid,
        filter: 'hot_first',
        page: 1,
        size: pageSize,
      })

      if (data.success) {
        yield put({ type: 'queryListSuccess', payload: { list: data.posts } })

        setTimeout(() => {
          const height = document.querySelector('#hotList').offsetHeight
          contentHeight(height)
        }, 0)
      }
    },
    *like({ payload }, { call, put }) {
      const { sendid, isLike } = payload
      yield put({ type: 'likeSuccess', payload: { sendid, isLike } })

      yield call(isLike ? like : unlike, {
        sendagree: {
          fellowid: '',
          sendid,
        },
      })
    },
  },
  reducers: {
    queryListSuccess(state, action) {
      const { list } = action.payload
      return { ...state, list }
    },
    likeSuccess(state, action) {
      const { sendid, isLike } = action.payload
      const list = state.list.map(item => (item.bbs_sendid === sendid ? { ...item, like: isLike ? '1' : '0', heart_times: isLike ? (+item.heart_times + 1) : (+item.heart_times - 1) } : item))
      return { ...state, list }
    },
  },
}
