import pathToRegexp from 'path-to-regexp'
// import { routerRedux } from 'dva/router'
import { getMoreReplay } from '../../services/bbs/moreReplay'

export default {
  namespace: 'festivalCompetition',
  state: {
    item: {},
    page: 1,
    count: 18,
    rank: {
      firstLoad: false,
      hasMore: true,
      total: 0,
      dataSource: [],
    },
    newest: {
      firstLoad: false,
      hasMore: true,
      total: 0,
      dataSource: [],
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(() => {
        const match = pathToRegexp('/festival/competition/:id').exec(location.pathname)
        if (match) {
          const id = match[1]
          console.log(id)
          dispatch({ type: 'queryRankList', payload: { id } })
          // dispatch({ type: 'queryNewestList', payload: { id } })
        }
      })
    },
  },
  effects: {
    *queryRankList({ payload }, { call, put, select }) {
      const { count } = yield select(state => state.festivalCompetition)
      const data = yield call(getMoreReplay, {
        fellowid: '1686',
        sendid: '1043',
        orderby: 'dateAsc',
        page: 1,
        count,
      })
      if (data.success) {
        yield put({ type: 'queryRankListSuccess',
          payload: {
            page: 2,
            rank: {
              firstLoad: true,
              dataSource: data.fellows,
              total: +data.count,
              hasMore: data.fellows.length < +data.count,
            },
          },
        })
      }
    },
    *queryMoreRankList({ payload }, { call, put, select }) {
      const { page, count } = yield select(state => state.festivalCompetition)
      const data = yield call(getMoreReplay, {
        fellowid: '1686',
        sendid: '1043',
        orderby: 'dateAsc',
        page,
        count,
      })
      if (data.success) {
        const hasMore = ((page - 1) * count) + data.fellows.length < +data.count
        yield put({ type: 'queryMoreRankListSuccess',
          payload: {
            page: page + 1,
            rank: {
              dataSource: data.fellows,
              total: +data.count,
              hasMore,
            },
          },
        })
      }
    },
    *queryNewestList({ payload }, { call, put, select }) {
      const { count } = yield select(state => state.festivalCompetition)
      const data = yield call(getMoreReplay, {
        fellowid: '1686',
        sendid: '1043',
        orderby: 'dateDesc',
        page: 1,
        count,
      })
      if (data.success) {
        yield put({ type: 'queryNewestListSuccess',
          payload: {
            page: 2,
            newest: {
              firstLoad: true,
              dataSource: data.fellows,
              total: +data.count,
              hasMore: data.fellows.length < +data.count,
            },
          },
        })
      }
    },
    *queryMoreNewestList({ payload }, { call, put, select }) {
      const { page, count } = yield select(state => state.festivalCompetition)
      const data = yield call(getMoreReplay, {
        fellowid: '1686',
        sendid: '1043',
        orderby: 'dateDesc',
        page,
        count,
      })
      if (data.success) {
        const hasMore = ((page - 1) * count) + data.fellows.length < +data.count
        yield put({ type: 'queryMoreNewestListSuccess',
          payload: {
            page: page + 1,
            newest: {
              dataSource: data.fellows,
              hasMore,
            },
          },
        })
      }
    },
  },
  reducers: {
    queryRankListSuccess(state, action) {
      return { ...state, ...action.payload }
    },
    queryMoreRankListSuccess(state, action) {
      const { page, rank } = action.payload
      return {
        ...state,
        page,
        rank: {
          firstLoad: true,
          total: rank.total,
          hasMore: rank.hasMore,
          dataSource: [...state.rank.dataSource, ...rank.dataSource],
        },
      }
    },
    queryNewestListSuccess(state, action) {
      return { ...state, ...action.payload }
    },
    queryMoreNewestListSuccess(state, action) {
      const { page, newest } = action.payload
      return {
        ...state,
        page,
        newest: {
          firstLoad: true,
          total: newest.total,
          hasMore: newest.hasMore,
          dataSource: [...state.newest.dataSource, ...newest.dataSource],
        },
      }
    },
  },
}
