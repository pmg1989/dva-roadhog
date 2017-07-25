import React from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { ListView } from 'NbComponent'
import styles from './index.less'

const HotList = ({ dispatch, location, bbsHotList }) => {
  const { list } = bbsHotList
  const { query: { token } } = location

  const listViewProps = {
    list,
    token,
    linkTo({ sendid }) {
      dispatch(routerRedux.push({
        pathname: `/bbs/detail/${sendid}`,
        query: { token },
      }))
    },
    like({ sendid, isLike }) {
      dispatch({
        type: 'bbsHotList/like',
        payload: { sendid, isLike },
      })
    },
  }

  return (
    <div className={styles.hot_list_box} id="hotList">
      <ListView {...listViewProps} />
    </div>
  )
}

export default connect(({ bbsHotList }) => ({ bbsHotList }))(HotList)
