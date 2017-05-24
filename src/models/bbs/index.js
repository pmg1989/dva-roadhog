import { getCategory, getList } from '../../services/bbs/index'

const cateList = ['post_desc', 'hot_first', 'near_most'] // 每个类别的ID号

export default {
  namespace: 'bbsIndex',
  state: {
    navOpen: false,
    categories: [],
    loading: [true, true, true],
    latest: [],
    hot: [],
    near: [],
    pagination: {
      page: 1,
      size: 5,
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        const pathname = location.pathname
        if (pathname === '/' || pathname === '/bbs/index') {
          dispatch({ type: 'queryCategory' })
          dispatch({ type: 'queryList', payload: { tab: +location.query.tab || 0 } })
        }
      })
    },
  },
  effects: {
    *queryCategory({ payload }, { call, put }) {
      const data = yield call(getCategory)
      if (data.success) {
        yield put({ type: 'querySuccess', payload: { categories: data.categories } })
      }
    },
    *queryList({ payload }, { call, put, select }) {
      const pagination = yield select(state => state.bbsIndex.pagination)

      const data = yield call(getList, {
        filter: cateList[payload.tab],
        ...pagination,
      })

      if (data.success) {
        switch (payload.tab) {
          case 0:
            yield put({ type: 'querySuccess', payload: { latest: data.posts } })
            break
          case 1:
            yield put({ type: 'querySuccess', payload: { hot: data.posts } })
            break
          case 2:
            yield put({ type: 'querySuccess', payload: { near: data.posts } })
            break
          default:
            break
        }
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
