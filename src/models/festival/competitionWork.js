import pathToRegexp from 'path-to-regexp'
// import { routerRedux } from 'dva/router'
import { getMoreReplay } from '../../services/bbs/moreReplay'

export default {
  namespace: 'festivalCompetitionWork',
  state: {
    item: {},
    page: 1,
    count: 10,
    hasMore: true,
    total: 0,
    dataSource: [],
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(() => {
        const match = pathToRegexp('/festival/competition-work/:id').exec(location.pathname)
        if (match) {
          const id = match[1]
          console.log(id)
          dispatch({ type: 'queryReplayList', payload: { id } })
        }
      })
    },
  },
  effects: {
    *queryReplayList({ payload }, { call, put, select }) {
      const { count } = yield select(state => state.festivalCompetitionWork)
      const data = yield call(getMoreReplay, {
        fellowid: '1686',
        sendid: '1043',
        orderby: 'dateAsc',
        page: 1,
        count,
      })
      if (data.success) {
        yield put({ type: 'queryReplaySuccess',
          payload: {
            item: data.fellow_info,
            dataSource: data.fellows,
            page: 2,
            total: +data.count,
            hasMore: data.fellows.length < +data.count,
          },
        })
      }
    },
    *queryMoreReplayList({ payload }, { call, put, select }) {
      const { page, count } = yield select(state => state.festivalCompetitionWork)
      const data = yield call(getMoreReplay, {
        fellowid: '1686',
        sendid: '1043',
        orderby: 'dateAsc',
        page,
        count,
      })
      if (data.success) {
        const hasMore = ((page - 1) * count) + data.fellows.length < +data.count
        yield put({ type: 'queryMoreReplayListSuccess',
          payload: {
            dataSource: data.fellows,
            page: page + 1,
            hasMore,
          },
        })
      }
    },
  },
  reducers: {
    queryReplaySuccess(state, action) {
      return { ...state, ...action.payload }
    },
    queryMoreReplayListSuccess(state, action) {
      const { dataSource, page, hasMore } = action.payload
      return { ...state, dataSource: [...state.dataSource, ...dataSource], page, hasMore }
    },
  },
}
