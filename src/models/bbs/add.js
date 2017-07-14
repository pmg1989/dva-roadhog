import { routerRedux } from 'dva/router'
import { queryString } from 'utils/tools'
import { getCategory } from '../../services/bbs/index'
import { addSend } from '../../services/bbs/add'

export default {
  namespace: 'bbsAdd',
  state: {
    categories: [],
    selected: false,
    item: {
      bbsCategory: {},
      title: '',
      content: '',
    },
  },
  subscriptions: {
    // setup({ history }) {
    //   history.listen((location) => {
    //     const { pathname } = location
    //     if (pathname === '/bbs/add') {
    //     }
    //   })
    // },
  },
  effects: {
    *showCategory({ payload }, { call, put, select }) {
      const { categories } = yield select(state => state.bbsAdd)
      if (!categories.length) {
        const data = yield call(getCategory)
        if (data.success) {
          yield put({
            type: 'getCategorySuccess',
            payload: { categories: data.categories, selected: true },
          })
        }
      } else {
        yield put({
          type: 'getCategorySuccess',
          payload: { selected: true },
        })
      }
    },
    *addSend({ payload }, { call, put, select }) {
      const { item } = yield select(state => state.bbsAdd)
      console.log(item)
      const data = yield call(addSend, {
        send: {
          bbsCategory: item.bbsCategory.cid,
          title: item.title,
          content: item.content,
          bbslabel: [],
          latitude: '',
          longitude: '',
          place: '',
        },
      })

      if (data.success) {
        const token = queryString('token')
        yield put(routerRedux.push({ pathname: `/?token=${token}` }))
      }
    },
  },
  reducers: {
    getCategorySuccess(state, action) {
      return { ...state, ...action.payload }
    },
    selected(state, action) {
      const { cid, name } = action.payload
      const { item } = state
      return { ...state, item: { ...item, bbsCategory: { cid, name } }, selected: false }
    },
    back(state) {
      return { ...state, selected: false }
    },
    textChange(state, action) {
      const { key, value } = action.payload
      const { item } = state
      return { ...state, item: { ...item, [key]: value } }
    },
  },
}
