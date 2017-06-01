import iScrollRefresh from 'iScrollRefresh'
import { getList } from '../../services/bbs/index'

const pageSize = 10
let ir, catId

export default {
  namespace: 'bbsCategory',
  state: {
    navOpen: true,
    loading: true,
    category: {},
    list: [],
    navHeight: 'auto',
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

      function bindEvent() {

        document.querySelector("#ir-bd-wrapper").addEventListener('touchmove', function () {
          // if(isNavOpen) {
          //   dispatch({ type: 'closeNav' })
          // }
          event.preventDefault()
        }, false)
      }

      history.listen((location) => {
        const { pathname, query: { cid } } = location
        if (pathname === '/bbs/category') {
          setTimeout(() => {
            ir = new iScrollRefresh(null, '#ir-bd-wrapper')
      			ir.downAction = pullDown   //下拉刷新取数据函数
      			ir.upAction = pullUp       //上拉加载取数据函数
            dispatch({ type: 'initData', payload: { cid } })

            bindEvent()
          }, 0)
        }
      })
    },
  },
  effects: {
    *initData({ payload }, { call, put }) {
      const { cid } = payload
      catId = cid
      const data = yield call(getList, {
        cat: cid,
        filter: "post_desc",
        page: 1,
        size: pageSize,
      })

      if(data.success) {
        yield put({ type: 'querySuccess', payload: { list: data.posts, category: data.category } })
        setTimeout(() => {
          ir.setPage(0, 2)  //设置当前页面的页数
          ir.refresh(0)    //刷新Iscroll
        }, 100)
      }
    },
    *pullDown({ payload }, { call, put }) {
      const { page, param } = payload
      const data = yield call(getList, {
        cat: catId,
        filter: "post_desc",
        page: 1,
        size: pageSize,
      })

      if(data.success) {
        yield put({ type: 'querySuccess', payload: { list: data.posts, category: data.category } })

        setTimeout(() => {
          ir.setPage(0, 2)         //设置当前页面的页数
          ir.pullDownCallBack(param) //还有数据的时候用这个
        }, 100)
      }
    },
    *pullUp({ payload }, { call, put }) {
      const { page, param } = payload
      const data = yield call(getList, {
        cat: catId,
        filter: "post_desc",
        page,
        size: pageSize,
      })

      if(data.success) {
        yield put({ type: 'queryMoreSuccess', payload: { list: data.posts } })
        setTimeout(() => {
          ir.pullUpCallBack(param); //还有数据的时候用这个
        }, 100)
      }
    },
  },
  reducers: {
    querySuccess(state, action) {
      const { list, category } = action.payload
      return { ...state, list, category, loading: false }
    },
    queryMoreSuccess(state, action) {
      const list = [...state.list, ...action.payload.list]
      return { ...state, list }
    },
    switchNav(state) {
      const { navHeight, navOpen } = state
      isNavOpen = !navOpen
      if(navHeight === 'auto') {
        return { ...state, navOpen: !navOpen, navHeight: document.querySelector("#navTop").offsetHeight }
      }
      return { ...state, navOpen: !navOpen }
    },
    closeNav(state) {
      isNavOpen = false
      const { navHeight } = state
      if(navHeight === 'auto') {
        return { ...state, navOpen: false, navHeight: document.querySelector("#navTop").offsetHeight }
      }
      return { ...state, navOpen: false }
    },
    loadingSuccess(state, action) {
      const { tab } = action.payload
      const loading = state.loading.map((item, index) => (index === tab ? false: item))
      return { ...state, loading }
    },
  },
}
