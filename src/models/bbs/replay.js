import { routerRedux } from 'dva/router'
import utils from 'utils'
import { addReplay } from '../../services/bbs/replay'

export default {
  namespace: 'bbsReplay',
  state: {
    item: {
      send: utils.queryString('sendid'),
      bbsCid: '',
      content: '',
      latitude: '',
      longitude: '',
      parentFellowId: utils.queryString('fellowid') || '',
      parentUser: utils.queryString('userid'),
      place: '',
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
    *addReplay({ payload }, { call, put, select }) {
      const { item } = yield select(state => state.bbsReplay)
      // console.log(item); return
      const data = yield call(addReplay, {
        fellow: item,
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
    addressChange(state, action) {
      const { place, latitude, longitude } = action.payload
      const { item } = state
      return { ...state, item: { ...item, place, latitude, longitude } }
    },
  },
}
