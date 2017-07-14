import React from 'react'
import classnames from 'classnames'
import { Link } from 'dva/router'
import { Icon, ActionSheet, Modal, Toast } from 'antd-mobile'
import { isIOS, renderDate, renderTimes, renderContent } from 'utils/tools'
import { ViewList, LikeIcon } from 'NbComponent'
import styles from './ReplayList.less'

const alert = Modal.alert

const ReplayInner = ({ item, token, sendid }) => {
  // const renderHtml = (item) => {
  //   const userStr = `<span id="userName">@${item.parentusername}</span>`
  //   return userStr + item.content
  // }

  return (
    <div className={styles.inner_box}>
      {item.fellow_two_list.length > 0 && item.fellow_two_list.map((cur, key) => (
        <dl className="clear-fix" key={key}>
          <dt style={{ float: 'left' }}><span className={styles.inner_name}>{cur.name}</span>：</dt>
          <dd className={styles.inner_text} dangerouslySetInnerHTML={{ __html: renderContent(cur.content) }} />
        </dl>
      ))}
      {+item.fellow_two_total > 0 &&
      <Link className={styles.inner_total}
        to={`/bbs/more-replay?fellowid=${item.bbsfellowid}&sendid=${sendid}&token=${token}`}
        onClick={e => e.stopPropagation()}
      >共{item.fellow_two_total}条回复&nbsp;&gt;&gt;</Link>
      }
    </div>
  )
}

const ReplayList = ({
  sendid,
  token,
  dataSource,
  total,
  hasMore,
  userId,
  queryMoreList,
  changeOrderBy,
  likeReplay,
  linkToReplay,
  deleteReplay,
}) => {
  const handleRowClick = (item) => {
    const isShowDelete = userId === +item.userid

    let wrapProps = {}
    if (isIOS) {
      wrapProps = {
        onTouchStart: e => e.preventDefault(),
      }
    }

    let BUTTONS = ['回复', '举报', '取消']
    if (isShowDelete) {
      BUTTONS = ['回复', '删除', '取消']
    }
    ActionSheet.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: BUTTONS.length - 1,
      destructiveButtonIndex: BUTTONS.length - 2,
      maskClosable: true,
      'data-seed': 'logId',
      wrapProps,
    },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          linkToReplay({ fellowid: item.bbsfellowid, userid: item.userid })
        } else if (buttonIndex === 1) {
          if (isShowDelete) {
            alert('删除', '确定删除此贴吗?', [
              { text: '取消' },
              { text: '确定',
                onPress: () => deleteReplay({ fellowid: item.bbsfellowid }),
                style: { fontWeight: 'bold' },
              },
            ])
          } else {
            alert('举报', '确定举报此贴吗?', [
              { text: '取消' },
              { text: '确定',
                onPress: () => Toast.success('举报成功!', 2),
                style: { fontWeight: 'bold' },
              },
            ])
          }
        }
      },
    )
  }

  const Header = () => {
    const handleChange = (e) => {
      changeOrderBy(e.target.value)
    }

    return (
      <div className={classnames('flex-box', styles.header)}>
        <div className="flex-item">
          评论&nbsp;(共<span>{total}</span>条)
        </div>
        <div className={classnames('flex-item', styles.filter_box)}>
          <select className={styles.filter} defaultValue="dateAsc" onChange={handleChange}>
            <option value="dateAsc">按时间正序</option>
            <option value="dateDesc">按时间倒序</option>
            <option value="onlyHost">只看楼主</option>
          </select>
        </div>
      </div>
    )
  }

  const Row = (item, sectionID, rowID) => {
    return (
      <div key={rowID} className="flex-box list-view-row" onClick={() => handleRowClick(item)}>
        <div className={styles.thumb_box}>
          <img src={item.userimg} alt={item.username} />
        </div>
        <div className={classnames('flex-item', styles.right_box)}>
          <div className={classnames('flex-box', styles.top)}>
            <div className="flex-item">
              <span className={styles.name}>{item.username}</span><br />
              <span className={styles.date}>{renderDate(item.senddate)}</span>
            </div>
            <div className={classnames('flex-box', styles.opt_box)}>
              <LikeIcon item={item} handleLike={likeReplay} />
              <div className={classnames('flex-item', styles.replay)}>
                <span><Icon type={require('../../../svg/discu.svg')} /></span>
                <span className={styles.count}>{renderTimes(+item.fellowtimes)}</span>
              </div>
            </div>
          </div>
          <div className={styles.middle}>
            <div className={styles.text} dangerouslySetInnerHTML={{ __html: renderContent(item.content) }} />
          </div>
          <div className={styles.bottom}>
            {item.fellow_two_list.length > 0 && <ReplayInner item={item} token={token} sendid={sendid} />}
          </div>
        </div>
      </div>
    )
  }

  const viewListProps = {
    dataSource,
    hasMore,
    queryMoreList,
    Header,
    Row,
    className: styles.replay_list,
  }

  return <ViewList {...viewListProps} />
}

export default ReplayList
