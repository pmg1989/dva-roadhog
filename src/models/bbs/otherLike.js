import iScrollRefresh from 'iScrollRefresh'
import { refreshTime } from 'utils/config'
import { getList } from '../../services/bbs/otherLikeSend'
import { like, unlike } from '../../services/bbs/base'

const pageSize = 5
let ir
let userId

export default {
  namespace: 'bbsOtherLike',
  state: {
    loading: true,
    list: [],
  },
  subscriptions: {
    setup({ dispatch, history }) {
      function pullUp(param) {
        const { page } = param
        dispatch({ type: 'pullUp', payload: { page, param } })
      }

      function pullDown(param) {
        dispatch({ type: 'pullDown', payload: { page: 1, param } })
      }

      history.listen((location) => {
        const { pathname, query: { userid } } = location
        userId = userid
        if (pathname === '/bbs/other-like') {
          setTimeout(() => {
            ir = new iScrollRefresh(null, '#ir-bd-wrapper')
      			ir.downAction = pullDown   // 下拉刷新取数据函数
      			ir.upAction = pullUp       // 上拉加载取数据函数
            dispatch({ type: 'initData' })
          }, 0)
        }
      })
    },
  },
  effects: {
    *initData({ payload }, { call, put }) {
      const data = yield call(getList, userId, {
        page: 1,
        count: pageSize,
        type: 2,
      })

      if (data.success) {
        yield put({ type: 'querySuccess', payload: { list: data.bbssend } })
        setTimeout(() => {
          ir.setPage(0, 2)  // 设置当前页面的页数
          ir.refresh(0)    // 刷新Iscroll
        }, refreshTime)
      }
    },
    *pullDown({ payload }, { call, put }) {
      const { param } = payload
      const data = yield call(getList, userId, {
        page: 1,
        count: pageSize,
        type: 2,
      })

      if (data.success) {
        yield put({ type: 'querySuccess', payload: { list: data.bbssend } })

        setTimeout(() => {
          ir.setPage(0, 2)         // 设置当前页面的页数
          ir.pullDownCallBack(param) // 还有数据的时候用这个
        }, refreshTime)
      }
    },
    *pullUp({ payload }, { call, put }) {
      const { page, param } = payload
      const data = yield call(getList, userId, {
        page,
        count: pageSize,
        type: 2,
      })

      if (data.success) {
        yield put({ type: 'queryMoreSuccess', payload: { list: data.bbssend } })
        setTimeout(() => {
          ir.pullUpCallBack(param) // 还有数据的时候用这个
        }, refreshTime)
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
    querySuccess(state, action) {
      const { list } = action.payload
      return { ...state, list, loading: false }
    },
    queryMoreSuccess(state, action) {
      const list = [...state.list, ...action.payload.list]
      return { ...state, list }
    },
    likeSuccess(state, action) {
      const { sendid, isLike } = action.payload
      const list = state.list.map(item => (item.bbs_sendid === sendid ? { ...item, like: isLike ? '1' : '0', heart_times: isLike ? (+item.heart_times + 1) : (+item.heart_times - 1) } : item))
      return { ...state, list }
    },
  },
}
