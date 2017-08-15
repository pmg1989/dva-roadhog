import React from 'react'
import { connect } from 'dva'
import Header from './Header'
import List from './List'
import Bottom from './Bottom'

const User = ({ dispatch, location, centerUser }) => {
  const { user, courses, activities, hasMore } = centerUser
  const { query: { share } } = location

  const headerProps = {
    user,
    onDownLoadClick() {
      goToDownLoad()
    },
  }

  const listProps = {
    userCover: user.image,
    courses,
    activities,
    hasMore,
    onQueryActivities() {
      dispatch({ type: 'centerUser/getActivities' })
    },
    onQueryMoreActivities() {
      dispatch({ type: 'centerUser/getMoreActivities' })
    },
    onDownLoadClick() {
      goToDownLoad()
    },
  }

  const bottomProps = {
    onDownLoadClick() {
      goToDownLoad()
    },
  }

  return (
    <div>
      <Header {...headerProps} />
      <List {...listProps} />
      { share === '1' && <Bottom {...bottomProps} /> }
    </div>
  )
}

export default connect(({ centerUser }) => ({ centerUser }))(User)
