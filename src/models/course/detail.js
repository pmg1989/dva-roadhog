import pathToRegexp from 'path-to-regexp'
import { wechat } from 'utils'
import { queryString } from 'utils/tools'
import { getDetail, getRecommend } from '../../services/course/detail'

const isShare = queryString('share') === '1'

export default {
  namespace: 'courseDetail',
  state: {
    item: {},
    recommendList: [],
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        const match = pathToRegexp('/course/detail/:id').exec(location.pathname)
        if (match) {
          const id = match[1]
          dispatch({ type: 'getDetail', payload: { id } })
          dispatch({ type: 'getRecommend' })
        }
      })
    },
  },
  effects: {
    *getDetail({ payload }, { call, put }) {
      const { id } = payload
      const data = yield call(getDetail, id, { with: 'lessons' }, isShare)
      if (data.success) {
        yield put({ type: 'getDetailSuccess', payload: { item: data.course } })

        wechat.share({
          title: data.share.title,
          desc: data.share.description,
          imgUrl: data.share.image,
        })
      }
    },
    *getRecommend({ payload }, { call, put }) {
      const data = yield call(getRecommend, { type: 'course_detail_search' }, isShare)
      if (data.success) {
        yield put({ type: 'getRecommendSuccess', payload: { recommendList: data.list } })
      }
    },
  },
  reducers: {
    getDetailSuccess(state, action) {
      return { ...state, ...action.payload }
    },
    getRecommendSuccess(state, action) {
      return { ...state, ...action.payload }
    },
  },
}
