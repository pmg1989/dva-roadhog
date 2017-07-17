import pathToRegexp from 'path-to-regexp'
import { routerRedux } from 'dva/router'
import { wechat } from 'utils'
import { queryString, removeHTMLTag } from 'utils/tools'
import { getDetail, getReplayList, deleteSend } from '../../services/bbs/detail'
import { like, unlike, deleteSendFellow } from '../../services/bbs/base'

export default {
  namespace: 'bbsDetail',
  state: {
    item: {},
    sendStatus: 1, // 帖子的删除状态 1:未删除  0: 删除
    share: false,  // 帖子的分享状态 true:分享打开的 0: app内打开的
    sendid: null,
    page: 1,
    count: 10,
    hasMore: true,
    total: 0,
    orderby: 'dateAsc',
    dataSource: [],
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(() => {
        const match = pathToRegexp('/bbs/detail/:sendid').exec(location.pathname)
        if (match) {
          const sendid = match[1]
          const share = queryString('share')
          if (share === '1') {
            dispatch({ type: 'queryDetail', payload: { sendid, share: true } })
          } else {
            dispatch({ type: 'app/queryUser' })
            dispatch({ type: 'queryDetail', payload: { sendid, share: false } })
          }
        }
      })
    },
  },
  effects: {
    *queryDetail({ payload }, { call, put }) {
      const { sendid, share } = payload
      const data = yield call(getDetail, sendid, share)
      if (data.success) {
        const shareParams = data.bbssend[0]
        const desc = removeHTMLTag(shareParams.content)
        wechat.share({
          title: shareParams.title,
          desc: desc.length > 50 ? `${desc.substring(0, 50)}...` : desc,
          imgUrl: shareParams.user_img,
          link: shareParams.share_url,
          // type: 'music',
          // dataUrl: 'i am dataUrl',
        })

        yield put({ type: 'queryDetailSuccess', payload: { item: data.bbssend[0], sendStatus: 1, share } })
        yield put({ type: 'queryReplayList', payload: { sendid } })
      } else {
        yield put({ type: 'queryDetailSuccess', payload: { sendStatus: 0 } })
      }
    },
    *changeOrderBy({ payload }, { put, select }) {
      const { sendid } = yield select(state => state.bbsDetail)
      yield put({ type: 'changeOrderBySuccess', payload })
      yield put({ type: 'queryReplayList', payload: { sendid } })
    },
    *queryReplayList({ payload }, { call, put, select }) {
      const { count, orderby, share } = yield select(state => state.bbsDetail)
      const data = yield call(getReplayList, share, {
        sendid: payload.sendid,
        orderby,
        page: 1,
        count,
      })
      if (data.success) {
        yield put({ type: 'queryReplayListSuccess',
          payload: {
            dataSource: data.fellows,
            page: 2,
            total: +data.count,
            sendid: payload.sendid,
            hasMore: data.fellows.length < +data.count,
          },
        })
      }
    },
    *queryMoreReplayList({ payload }, { call, put, select }) {
      const { sendid, page, count, orderby, share } = yield select(state => state.bbsDetail)
      const data = yield call(getReplayList, share, {
        sendid,
        orderby,
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
    *like({ payload }, { call, put, select }) {
      const { fellowid, isLike } = payload
      const { sendid } = yield select(state => state.bbsDetail)

      yield put({ type: 'likeSuccess', payload: { isLike } })

      yield call(isLike ? like : unlike, {
        sendagree: {
          fellowid,
          sendid,
        },
      })
    },
    *likeReplay({ payload }, { call, put, select }) {
      const { fellowid, isLike } = payload
      const { sendid } = yield select(state => state.bbsDetail)

      yield put({ type: 'likeReplaySuccess', payload: { fellowid, isLike } })

      yield call(isLike ? like : unlike, {
        sendagree: {
          fellowid,
          sendid,
        },
      })
    },
    *deleteSend({ payload }, { call, put, select }) {
      const { sendid } = yield select(state => state.bbsDetail)
      const data = yield call(deleteSend, sendid)
      if (data.success) {
        const token = queryString('token')
        yield put(routerRedux.push({
          pathname: '/',
          query: { token },
        }))
      }
    },
    *deleteReplay({ payload }, { call, put }) {
      const { fellowid } = payload
      const data = yield call(deleteSendFellow, fellowid)
      if (data.success) {
        yield put({ type: 'deleteReplaySuccess', payload: { fellowid } })
      }
    },
  },
  reducers: {
    queryDetailSuccess(state, action) {
      return { ...state, ...action.payload }
    },
    queryReplayListSuccess(state, action) {
      return { ...state, ...action.payload }
    },
    queryMoreReplayListSuccess(state, action) {
      const { dataSource, page, hasMore } = action.payload
      return { ...state, dataSource: [...state.dataSource, ...dataSource], page, hasMore }
    },
    changeOrderBySuccess(state, action) {
      const { orderby } = action.payload
      return { ...state, orderby }
    },
    likeSuccess(state, action) {
      const { isLike } = action.payload
      const { item } = state
      return { ...state, item: { ...item, like: isLike ? '1' : '0', heart_times: isLike ? (+item.heart_times + 1) : +item.heart_times - 1 } }
    },
    likeReplaySuccess(state, action) {
      const { fellowid, isLike } = action.payload
      const dataSource = state.dataSource.map(item => (item.bbsfellowid === fellowid ? { ...item, like: isLike ? '1' : '0', hearttimes: isLike ? (+item.hearttimes + 1) : (+item.hearttimes - 1) } : item))
      return { ...state, dataSource }
    },
    deleteReplaySuccess(state, action) {
      const { fellowid } = action.payload
      const dataSource = state.dataSource.filter(item => item.bbsfellowid !== fellowid)
      return { ...state, dataSource }
    },
  },
}
