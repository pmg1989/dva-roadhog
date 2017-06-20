import pathToRegexp from 'path-to-regexp'
// import { routerRedux } from 'dva/router'
// import { getDetail, getReplayList, deleteSend } from '../../services/bbs/detail'
// import { like, unlike, deleteSendFellow } from '../../services/bbs/base'

export default {
  namespace: 'festivalCompetition',
  state: {
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(() => {
        const match = pathToRegexp('/festival/competition/:id').exec(location.pathname)
        if (match) {
          const id = match[1]
          console.log(id)
          dispatch({ type: 'query', payload: { id } })
        }
      })
    },
  },
  effects: {
    //*query({ payload }, { call, put }) {
      // const { sendid, share } = payload
      // const data = yield call(getDetail, sendid, share)
      // if (data.success) {
      //   yield put({ type: 'queryDetailSuccess', payload: { item: data.bbssend[0], sendStatus: 1, share } })
      //   yield put({ type: 'queryReplayList', payload: { sendid } })
      // } else {
      //   yield put({ type: 'queryDetailSuccess', payload: { sendStatus: 0 } })
      // }
    //},
  },
  reducers: {
    queryDetailSuccess(state, action) {
      return { ...state, ...action.payload }
    },
  },
}
