import pathToRegexp from 'path-to-regexp'
import { queryString } from 'utils/tools'
import $ from 'jquery'
import { getDetail } from '../../services/topic/detail'

const isShare = queryString('share') === '1'
const token = queryString('token')

const renderAVI = () => {
  const $text = $('#text')
  const $video = $text.find('video')
  const $audio = $text.find('audio')

  $.each($video, function() {
    const poster = `${$(this).attr('src')}?vframe/jpg/offset/0`
    $(this).attr({
      width: '100%',
      controls: '',
      preload: 'none',
      playsinline: '',
      'webkit-playsinline': '',
      // onloadedmetadata: 'whether(this)',
      poster,
    })
  })

  $.each($audio, function() {
    const src = $(this).attr('src')
    const $p = $(this).parent('p')
    $p.children($(this)).remove()
    $p.append(`<iframe
                width="100%"
                height="80"
                frameborder="0"
                name="audio"
                src="/audio.html?audio='${src}'">
               </iframe>`)
  })
}

export default {
  namespace: 'topicDetail',
  state: {
    item: {},
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        const match = pathToRegexp('/topic/detail/:id').exec(location.pathname)
        if (match) {
          const id = match[1]
          dispatch({ type: 'getDetail', payload: { id } })
        }
      })
    },
  },
  effects: {
    *getDetail({ payload }, { call, put }) {
      const { id } = payload
      // 带token请求是因为分享的API请求地址不规范
      const data = yield call(getDetail, { id, token, read: 1 }, isShare)
      if (data.success) {
        yield put({ type: 'getDetailSuccess',
          payload: {
            item: data,
          },
        })
      }
    },
  },
  reducers: {
    getDetailSuccess(state, action) {
      setTimeout(() => renderAVI(), 50)
      return { ...state, ...action.payload }
    },
  },
}
