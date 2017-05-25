import iScrollRefresh from 'iScrollRefresh'
import { getCategory, getList } from '../../services/bbs/index'

const cateList = ['post_desc', 'hot_first', 'near_most'] // 每个类别的ID号
let ir

export default {
  namespace: 'bbsIndex',
  state: {
    navOpen: false,
    categories: [],
    loading: [true, true, true],
    tab: 0,
    latest: [],
    hot: [],
    near: [],
  },
  subscriptions: {
    setup({ dispatch, history }) {

      function pullUp(param) {
        const { index, page } = param
        dispatch({ type: 'pullUp', payload: { tab: index, page, param } })
      }

      function pullDown(param) {
        const { index } = param
        dispatch({ type: 'pullDown', payload: { tab: index, page: 1, param } })
      }

      function slide(index) {
        dispatch({ type: 'slide', payload: { tab: index } })
      }

      history.listen((location) => {
        const { pathname, query: { tab } } = location
        if (pathname === '/' || pathname === '/bbs/index') {
          //dispatch({ type: 'queryCategory' })

          setTimeout(() => {
            ir = new iScrollRefresh('#ir-tabs-wrapper', '#ir-bd-wrapper')
      			ir.downAction = pullDown   //下拉刷新取数据函数
      			ir.upAction = pullUp       //上拉加载取数据函数
      			ir.slideAction = slide     //左右滑动的回调函数
            slide(+tab || 0)
            if(+tab > 0) {
      				ir.bdScroll.goToPage(tab, 0, 0)
      			}
          }, 0)
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
    *queryList({ payload }, { call, put }) {
      const { isFirst, tab, page } = payload
      const data = yield call(getList, {
        filter: cateList[tab],
        page,
        size: 10,
      })

      if (data.success) {
        switch (payload.tab) {
          case 0:
            yield put({ type: isFirst ? 'querySuccess' : 'queryLatestSuccess', payload: { latest: data.posts, tab } })
            break
          case 1:
            yield put({ type: isFirst ? 'querySuccess' : 'queryHotSuccess', payload: { hot: data.posts, tab } })
            break
          case 2:
            yield put({ type: isFirst ? 'querySuccess' : 'queryNearSuccess', payload: { near: data.posts, tab } })
            break
          default:
            break
        }
      }
    },
    *initData({ payload }, { call, put }) {
      const { tab } = payload
      yield put({ type: 'queryList', payload: { tab, page: 1, isFirst: true } })
      yield put({ type: 'loadingSuccess', payload: { tab } })

      setTimeout(() => {
        ir.setPage(tab,2)  //设置当前页面的页数
        ir.refresh(tab)    //刷新Iscroll
      }, 500)
    },
    *pullDown({ payload }, { call, put }) {
      const { tab, page, param } = payload
      yield put({ type: 'queryList', payload: { tab, page, isFirst: true } })

      setTimeout(() => {
        ir.setPage(tab, 2)         //设置当前页面的页数
        ir.pullDownCallBack(param) //还有数据的时候用这个
      }, 500)
    },
    *pullUp({ payload }, { call, put }) {
      const { tab, page, param } = payload
      yield put({ type: 'queryList', payload: { tab, page } })

      setTimeout(() => {
        ir.pullUpCallBack(param); //还有数据的时候用这个
      }, 500)
    },
    *slide({ payload }, { call, put, select }) {
      const { tab } = payload
      const loading = yield select(state => state.bbsIndex.loading)
      if(loading[tab]) {
        yield put({ type: 'initData', payload: { tab } })
      }
    },
  },
  reducers: {
    querySuccess(state, action) {
      return { ...state, ...action.payload }
    },
    queryLatestSuccess(state, action) {
      const latest = [...state.latest, ...action.payload.latest]
      return { ...state, latest  }
    },
    queryHotSuccess(state, action) {
      const hot = [...state.hot, ...action.payload.hot]
      return { ...state, hot  }
    },
    queryNearSuccess(state, action) {
      const near = [...state.near, ...action.payload.near]
      return { ...state, near  }
    },
    switchNav(state) {
      const { navOpen } = state
      return { ...state, navOpen: !navOpen }
    },
    loadingSuccess(state, action) {
      const { tab } = action.payload
      const loading = state.loading.map((item, index) => (index === tab ? false: item))
      return { ...state, loading }
    }
  },
}
