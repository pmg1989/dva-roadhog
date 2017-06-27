import pathToRegexp from 'path-to-regexp'
// import { routerRedux } from 'dva/router'
import { getWork } from '../../services/festival/competitionWork'
import { getMoreReplay } from '../../services/bbs/moreReplay'

export default {
  namespace: 'festivalCompetitionWork',
  state: {
    item: {
      competition: {},
      cover: {},
      file: {},
      user: {},
    },
    page: 1,
    count: 4,
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
          dispatch({ type: 'getWork', payload: { id } })
          dispatch({ type: 'queryReplayList', payload: { id } })
        }
      })
    },
  },
  effects: {
    *getWork({ payload }, { call, put }) {
      const { id } = payload
      const data = yield call(getWork, id)
      if (data.success) {
        yield put({
          type: 'getWorkSuccess',
          payload: {
            item: data.work,
          },
        })
      }
    },
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
    getWorkSuccess(state, action) {
      return { ...state, ...action.payload }
    },
    queryReplaySuccess(state, action) {
      return { ...state, ...action.payload }
    },
    queryMoreReplayListSuccess(state, action) {
      const { dataSource, page, hasMore } = action.payload
      return { ...state, dataSource: [...state.dataSource, ...dataSource], page, hasMore }
    },
  },
}
