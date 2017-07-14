import { routerRedux } from 'dva/router'
import { queryString } from 'utils/tools'
import { getCategory } from '../../services/bbs/index'
import { addSend } from '../../services/bbs/add'

export default {
  namespace: 'bbsAdd',
  state: {
    categories: [],
    headerStatus: 'add', // 'add': 发布帖子状态; 'categories': 选择分类列表状态; 'label'：插入话题状态
    item: {
      bbsCategory: {},
      title: '',
      content: '',
      bbslabel: [],
      latitude: '',
      longitude: '',
      place: '',
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
            payload: { categories: data.categories, headerStatus: 'categories' },
          })
        }
      } else {
        yield put({
          type: 'getCategorySuccess',
          payload: { headerStatus: 'categories' },
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
          latitude: item.latitude,
          longitude: item.longitude,
          place: item.place,
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
      return { ...state, item: { ...item, bbsCategory: { cid, name } }, headerStatus: 'add' }
    },
    back(state) {
      return { ...state, headerStatus: 'add' }
    },
    textChange(state, action) {
      const { key, value } = action.payload
      const { item } = state
      return { ...state, item: { ...item, [key]: value } }
    },
    addressChange(state, action) {
      const { place, latitude, longitude } = action.payload
      const { item } = state
      return { ...state, item: { ...item, place, latitude, longitude } }
    },
  },
}
