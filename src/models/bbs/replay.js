import { routerRedux } from 'dva/router'
import utils from 'utils'
import { addSend } from '../../services/bbs/add'

export default {
  namespace: 'bbsReplay',
  state: {
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
    //     if (pathname === '/bbs/replay') {
    //     }
    //   })
    // },
  },
  effects: {
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
        const token = utils.queryString('token')
        yield put(routerRedux.push({ pathname: `/?token=${token}` }))
      }
    },
  },
  reducers: {
    textChange(state, action) {
      const { key, value } = action.payload
      const { item } = state
      return { ...state, item: { ...item, [key]: value } }
    },
  },
}
