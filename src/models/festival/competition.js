import pathToRegexp from 'path-to-regexp'
// import { routerRedux } from 'dva/router'
import { get, queryRankList } from '../../services/festival/competition'

export default {
  namespace: 'festivalCompetition',
  state: {
    cid: null,
    item: {
      course_detail: {},
      practice_detail: {
        cover_detail: {}
      },
    },
    page: 1,
    size: 18,
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
          dispatch({ type: 'getCompetition', payload: { id } })
          dispatch({ type: 'queryRankList', payload: { id } })
        }
      })
    },
  },
  effects: {
    *getCompetition({ payload }, { call, put }) {
      const { id } = payload
      const data = yield call(get, { id })
      if (data.success) {
        yield put({ type: 'getCompetitionSuccess',
          payload: {
            item: data,
          },
        })
      }
    },
    *queryRankList({ payload }, { call, put, select }) {
      const { size } = yield select(state => state.festivalCompetition)
      const data = yield call(queryRankList, {
        cid: payload.id,
        order: 'hot',
        page: 1,
        size,
      })
      if (data.success) {
        yield put({ type: 'queryRankListSuccess',
          payload: {
            cid: payload.id,
            page: 2,
            rank: {
              firstLoad: true,
              dataSource: data.songs,
              total: data.count,
              hasMore: data.songs.length < data.count,
            },
          },
        })
      }
    },
    *queryMoreRankList({ payload }, { call, put, select }) {
      const { cid, page, size } = yield select(state => state.festivalCompetition)
      const data = yield call(queryRankList, {
        cid, page, size,
      })
      if (data.success) {
        const hasMore = ((page - 1) * size) + data.songs.length < data.count
        yield put({ type: 'queryMoreRankListSuccess',
          payload: {
            page: page + 1,
            rank: {
              dataSource: data.songs,
              total: data.count,
              hasMore,
            },
          },
        })
      }
    },
    *queryNewestList({ payload }, { call, put, select }) {
      const { cid, size } = yield select(state => state.festivalCompetition)
      const data = yield call(queryRankList, {
        cid,
        page: 1,
        size,
      })
      if (data.success) {
        yield put({ type: 'queryNewestListSuccess',
          payload: {
            cid,
            page: 2,
            newest: {
              firstLoad: true,
              dataSource: data.songs,
              total: data.count,
              hasMore: data.songs.length < data.count,
            },
          },
        })
      }
    },
    *queryMoreNewestList({ payload }, { call, put, select }) {
      const { cid, page, size } = yield select(state => state.festivalCompetition)
      const data = yield call(queryRankList, {
        cid, page, size,
      })
      if (data.success) {
        const hasMore = ((page - 1) * size) + data.songs.length < data.count
        yield put({ type: 'queryMoreNewestListSuccess',
          payload: {
            page: page + 1,
            newest: {
              dataSource: data.songs,
              total: data.count,
              hasMore,
            },
          },
        })
      }
    },
  },
  reducers: {
    getCompetitionSuccess(state, action) {
      return { ...state, ...action.payload }
    },
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
