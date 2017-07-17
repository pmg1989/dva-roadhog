import iScrollRefresh from 'iScrollRefresh'
import { refreshTime } from 'utils/config'
import { getCategory, getList } from '../../services/bbs/index'
import { like, unlike } from '../../services/bbs/base'

const cateList = ['post_desc', 'hot_first', 'near_most'] // 每个类别的ID号
const pageSize = 5
let ir, isLoading = [true, true, true], isNavOpen = true, tabIndex = 0

export default {
  namespace: 'bbsIndex',
  state: {
    navOpen: true,
    categories: [],
    tab: 0,
    loading: [true, true, true],
    list: [[], [], []],
    navHeight: 'auto',
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
        tabIndex = index
        if(isLoading[index]) {
          dispatch({ type: 'slide', payload: { tab: index } })
        }
      }

      function bindEvent() {

        document.querySelector("#ir-bd-wrapper").addEventListener('touchmove', function () {
          if(isNavOpen) {
            dispatch({ type: 'closeNav' })
          }
          event.preventDefault()
        }, false)
      }

      history.listen((location) => {
        const { pathname, query: { tab } } = location
        if (pathname === '/' || pathname === '/bbs/index') {
          dispatch({ type: 'queryCategory' })

          setTimeout(() => {
            ir = new iScrollRefresh('#ir-tabs-wrapper', '#ir-bd-wrapper')
      			ir.downAction = pullDown   //下拉刷新取数据函数
      			ir.upAction = pullUp       //上拉加载取数据函数
      			ir.slideAction = slide     //左右滑动的回调函数
            slide(+tab || 0)
            if(+tab > 0) {
              tabIndex = tab
      				ir.bdScroll.goToPage(+tab, 0, 0)
      			}

            bindEvent()
          }, 0)
        }
      })
    },
  },
  effects: {
    *queryCategory({ payload }, { call, put, select }) {
      const { categories } = yield select(state => state.bbsIndex)
      if(!categories.length) {
        const data = yield call(getCategory)
        if (data.success) {
          yield put({ type: 'queryCategorySuccess', payload: { categories: data.categories } })
        }
      }
    },
    *initData({ payload }, { call, put }) {
      const { tab } = payload
      const data = yield call(getList, {
        filter: cateList[tab],
        page: 1,
        size: pageSize,
      })

      if(data.success) {
        yield put({ type: 'querySuccess', payload: { tab, data: data.posts, init: true } })
        setTimeout(() => {
          ir.setPage(tab, 2)  //设置当前页面的页数
          ir.refresh(tab)    //刷新Iscroll
        }, refreshTime)
      }
    },
    *pullDown({ payload }, { call, put }) {
      const { tab, page, param } = payload
      const data = yield call(getList, {
        filter: cateList[tab],
        page,
        size: pageSize,
      })

      if(data.success) {
        yield put({ type: 'querySuccess', payload: { tab, data: data.posts } })

        setTimeout(() => {
          ir.setPage(tab, 2)         //设置当前页面的页数
          ir.pullDownCallBack(param) //还有数据的时候用这个
        }, refreshTime)
      }
    },
    *pullUp({ payload }, { call, put }) {
      const { tab, page, param } = payload
      const data = yield call(getList, {
        filter: cateList[tab],
        page,
        size: pageSize,
      })

      if(data.success) {
        yield put({ type: 'queryMoreSuccess', payload: { tab, data: data.posts } })
        setTimeout(() => {
          ir.pullUpCallBack(param); //还有数据的时候用这个
        }, refreshTime)
      }
    },
    *slide({ payload }, { call, put, select }) {
      const { tab } = payload
      isLoading[tab] = false
      const loading = yield select(state => state.bbsIndex.loading)
      if(loading[tab]) {
        yield put({ type: 'initData', payload: { tab } })
      }
    },
    *like({ payload }, {call, put}) {
      const { sendid, isLike } = payload

      yield put({ type: 'likeSuccess', payload: { sendid, isLike } })

      yield call(isLike ? like : unlike, {
        sendagree: {
          fellowid: '',
          sendid,
        }
      })
    },
  },
  reducers: {
    queryCategorySuccess(state, action) {
      return { ...state, ...action.payload }
    },
    querySuccess(state, action) {
      const { tab, data, init } = action.payload
      const list = state.list.map((item, index) => (index === tab ? data: item))
      const loading = state.loading.map((item, index) => (index === tab ? false: item))
      if(init) {
        return { ...state, list, tab, loading }
      }
      return { ...state, list, loading, navOpen: false }
    },
    queryMoreSuccess(state, action) {
      const { tab, data } = action.payload
      const list = state.list.map((item, index) => (index === tab ? [...item, ...data]: item))
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
    likeSuccess(state, action) {
      const { sendid, isLike } = action.payload
      const list = state.list.map((item, index) => {
        if(tabIndex === index) {
          return item.map(cur => (cur.bbs_sendid === sendid ? { ...cur, like: isLike ? '1' : '0', heart_times: isLike ? (+cur.heart_times + 1) : (+cur.heart_times - 1) } : cur))
        } else {
          return item
        }
      })
      return { ...state, list }
    },
  },
}
