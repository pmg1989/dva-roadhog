import pathToRegexp from 'path-to-regexp'
import { wechat } from 'utils'
import { queryString } from 'utils/tools'
import { getUser, getCourse, getActivities } from '../../services/center/user'

const isShare = queryString('share') === '1'

export default {
  namespace: 'centerUser',
  state: {
    user: {},
    courses: [],

    page: 1,
    size: 5,
    hasMore: true,
    total: 0,
    activities: [],
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        const match = pathToRegexp('/center/user/:id').exec(location.pathname)
        if (match) {
          const id = match[1]
          dispatch({ type: 'getUser', payload: { id } })
          dispatch({ type: 'getCourse', payload: { id } })
          // dispatch({ type: 'getActivities', payload: { id } })
        }
      })
    },
  },
  effects: {
    *getUser({ payload }, { call, put }) {
      const { id } = payload
      const data = yield call(getUser, id, isShare)
      if (data.success) {
        yield put({ type: 'getUserSuccess', payload: { user: data.user } })

        wechat.share({
          title: data.user.profile.name,
          desc: `这是“${data.user.profile.name}”的牛班主页，推荐你关注`,
          imgUrl: data.user.image,
        })
      }
    },
    *getCourse({ payload }, { call, put }) {
      const { id } = payload
      const data = yield call(getCourse, id, {}, isShare)
      if (data.success) {
        yield put({ type: 'getCourseSuccess', payload: { courses: data.courses } })
      }
    },
    *getActivities({ payload }, { select, call, put }) {
      const { user: { id } } = yield select(state => state.centerUser)
      const { size } = yield select(state => state.centerUser)
      const data = yield call(getActivities, id, {
        page: 1,
        size,
      }, isShare)
      if (data.success) {
        yield put({ type: 'getActivitiesSuccess',
          payload: {
            activities: data.activities,
            page: 2,
            total: data.total,
            hasMore: data.activities.length < data.total,
          },
        })
      }
    },
    *getMoreActivities({ payload }, { select, call, put }) {
      const { page, size, user: { id } } = yield select(state => state.centerUser)
      const data = yield call(getActivities, id, {
        page,
        size,
      }, isShare)
      if (data.success) {
        const hasMore = ((page - 1) * size) + data.activities.length < data.total
        yield put({ type: 'queryMoreActivitiesSuccess',
          payload: {
            activities: data.activities,
            page: page + 1,
            hasMore,
          },
        })
      }
    },
  },
  reducers: {
    getUserSuccess(state, action) {
      const { user } = action.payload
      return { ...state,
        user: {
          id: user.id,
          image: user.image,
          name: user.profile.name,
          brand: user.profile.brand,
          courseCount: 0,
          fansCount: user.attention.fanscount,
          attentionsCount: user.attention.attentionscount,
          level: user.attention.level,
        } }
    },
    getCourseSuccess(state, action) {
      return { ...state, ...action.payload }
    },
    getActivitiesSuccess(state, action) {
      return { ...state, ...action.payload }
    },
    queryMoreActivitiesSuccess(state, action) {
      const { activities, page, hasMore } = action.payload
      return { ...state, activities: [...state.activities, ...activities], page, hasMore }
    },
  },
}
