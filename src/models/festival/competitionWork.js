import pathToRegexp from 'path-to-regexp'
// import { routerRedux } from 'dva/router'
import { config, wechat } from 'utils'
import { queryString } from 'utils/tools'
import { getWork, getReplayList } from '../../services/festival/competitionWork'

const isShare = queryString('share') === '1'

export default {
  namespace: 'festivalCompetitionWork',
  state: {
    item: {
      competition: {},
      cover: {},
      file: {},
      user: {},
      practice_song: {
        cover: {},
        lyric: {},
      },
      achievement: [],
    },
    page: 1,
    count: 5,
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
        }
      })
    },
  },
  effects: {
    *getWork({ payload }, { call, put }) {
      const { id } = payload
      const data = yield call(getWork, id, isShare)
      if (data.success) {
        const isVideo = data.work.type === 'video'
        wechat.share({
          title: data.work.title,
          desc: data.work.description,
          imgUrl: (data.work.cover && data.work.cover.full_url) || config.defaultImage,
          // link: data.share_url,
          type: isVideo ? 'video' : 'music',
          dataUrl: data.work.file.full_url,
        })

        yield put({
          type: 'getWorkSuccess',
          payload: {
            item: data.work,
          },
        })

        yield put({ type: 'queryReplayList' })
      }
    },
    *queryReplayList({ payload }, { call, put, select }) {
      const { count, item: { send_id } } = yield select(state => state.festivalCompetitionWork)
      const data = yield call(getReplayList, {
        sendid: send_id || '1043',
        orderby: 'dateAsc',
        page: 1,
        count,
      }, isShare)
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
      const { page, count, item: { send_id } } = yield select(state => state.festivalCompetitionWork)
      const data = yield call(getReplayList, {
        sendid: send_id || '1043',
        orderby: 'dateAsc',
        page,
        count,
      }, isShare)
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
