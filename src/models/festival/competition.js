import pathToRegexp from 'path-to-regexp'
// import { routerRedux } from 'dva/router'
import { wechat } from 'utils'
import { queryString } from 'utils/tools'
import { get, queryRankList } from '../../services/festival/competition'

const isShare = queryString('share') === '1'

export default {
  namespace: 'festivalCompetition',
  state: {
    cid: null,
    item: {
      course_detail: {
        lessons: [{}, {}],
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
      const data = yield call(get, { id }, isShare)
      if (data.success) {
        yield put({ type: 'getCompetitionSuccess',
          payload: {
            item: data,
          },
        })

        const isVideo = data.detail_file_detail && data.detail_file_detail.mime === 'video/mp4'
        wechat.share({
          title: data.title,
          desc: data.description,
          imgUrl: data.detail_cover_file_detail.full_url,
          link: data.share_url,
          type: isVideo ? 'video' : '',
          dataUrl: isVideo ? data.detail_file_detail.full_url : '',
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
      }, isShare)
      if (data.success) {
        yield put({ type: 'queryRankListSuccess',
          payload: {
            cid: payload.id,
            page: 2,
            rank: {
              firstLoad: true,
              dataSource: data.works,
              total: data.total,
              hasMore: data.works.length < data.total,
            },
          },
        })
      }
    },
    *queryMoreRankList({ payload }, { call, put, select }) {
      const { cid, page, size } = yield select(state => state.festivalCompetition)
      const data = yield call(queryRankList, {
        cid, page, size,
      }, isShare)
      if (data.success) {
        const hasMore = ((page - 1) * size) + data.works.length < data.total
        yield put({ type: 'queryMoreRankListSuccess',
          payload: {
            page: page + 1,
            rank: {
              dataSource: data.works,
              total: data.total,
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
      }, isShare)
      if (data.success) {
        yield put({ type: 'queryNewestListSuccess',
          payload: {
            cid,
            page: 2,
            newest: {
              firstLoad: true,
              dataSource: data.works,
              total: data.total,
              hasMore: data.works.length < data.total,
            },
          },
        })
      }
    },
    *queryMoreNewestList({ payload }, { call, put, select }) {
      const { cid, page, size } = yield select(state => state.festivalCompetition)
      const data = yield call(queryRankList, {
        cid, page, size,
      }, isShare)
      if (data.success) {
        const hasMore = ((page - 1) * size) + data.works.length < data.total
        yield put({ type: 'queryMoreNewestListSuccess',
          payload: {
            page: page + 1,
            newest: {
              dataSource: data.works,
              total: data.total,
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
