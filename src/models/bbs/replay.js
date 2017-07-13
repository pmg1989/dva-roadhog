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
      content2: `<div>
                  <div>i am a content111</div>
                  <iframe width="100%" style="margin: 1rem 0 0.8rem 0;height:6.2rem" frameborder="0" name="audio" src="/audio.html?audio=//bbs.nwbasset.com/Fuh5w0G0kcmvP63dajsuvMVFYcTf"></iframe>
                  <div>i am a content222</div>
                  <iframe width="100%" unselectable="on" frameborder="0" name="video" src="/video.html?video=//bbs.nwbasset.com/Fho4qcj9lDlgi0XXePR3FwMTfcZz" id="iframe1" onload="setWinHeight(this)" height="216"></iframe>
                  <div>i am a content333</div>
                </div>`,
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
  },
}
