import React, { Component } from 'react'
import classnames from 'classnames'
import { Link } from 'dva/router'
import { ListView, Icon, ActionSheet, Modal, Toast } from 'antd-mobile'
import utils from 'utils'
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
          <dd className={styles.inner_text} dangerouslySetInnerHTML={{ __html: utils.renderContent(cur.content) }} />
        </dl>
      ))}
      {+item.fellow_two_total > 0 &&
      <Link className={styles.inner_total}
        to={`/replay-list?fellowid=${item.bbsfellowid}&sendid=${sendid}&token=${token}`}
        onClick={e => e.stopPropagation()}
      >共{item.fellow_two_total}条回复&nbsp;&gt;&gt;</Link>
      }
    </div>
  )
}

class ReplayList extends Component {

  constructor(props) {
    super(props)

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })

    this.state = {
      dataSource: dataSource.cloneWithRows({}),
      isLoading: true,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataSource !== this.props.dataSource) {
      this.setState({
        isLoading: false,
        dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource),
      })
    }
  }

  onEndReached = (event) => {
    if (this.state.isLoading || !this.props.hasMore) {
      return
    }
    if (event) {
      if (this.props.hasMore) {
        this.setState({ isLoading: true })
        this.props.queryMoreList()
      }
    }
  }

  handleLike(e, item) {
    e.stopPropagation()
    this.props.likeReplay({ fellowid: item.bbsfellowid })
  }

  handleUnLike(e, item) {
    e.stopPropagation()
    this.props.unlikeReplay({ fellowid: item.bbsfellowid })
  }

  handleRowClick(item) {
    const isShowDelete = this.props.userId === +item.userid

    let wrapProps = {}
    if (utils.isIOS) {
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
          this.props.linkToReplay({ fellowid: item.bbsfellowid })
        } else if (buttonIndex === 1) {
          if (isShowDelete) {
            alert('删除', '确定删除此贴吗?', [
              { text: '取消' },
              { text: '确定',
                onPress: () => this.props.deleteReplay({ fellowid: item.bbsfellowid }),
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

  render() {
    const ListHeader = () => {
      const { total } = this.props

      const handleChange = (e) => {
        this.props.changeOrderBy(e.target.value)
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

    const row = (item, sectionID, rowID) => {
      return (
        <div key={rowID} className="flex-box list-view-row" onClick={() => this.handleRowClick(item)}>
          <div className={styles.thumb_box}>
            <img src={item.userimg} alt={item.username} />
          </div>
          <div className={classnames('flex-item', styles.right_box)}>
            <div className={classnames('flex-box', styles.top)}>
              <div className="flex-item">
                <span className={styles.name}>{item.username}</span><br />
                <span className={styles.date}>{utils.renderDate(item.senddate)}</span>
              </div>
              <div className={classnames('flex-box', styles.opt_box)}>
                {item.like === '1' &&
                <div className={classnames('flex-item', styles.like)} onClick={e => this.handleUnLike(e, item)}>
                  <span><Icon type={require('../../../svg/like.svg')} /></span>
                  <span className={styles.count}>{utils.renderTimes(+item.hearttimes)}</span>
                </div>
                }
                {item.like === '0' &&
                <div className={classnames('flex-item', styles.unlike)} onClick={e => this.handleLike(e, item)}>
                  <span><Icon type={require('../../../svg/unlike.svg')} /></span>
                  <span className={styles.count}>{utils.renderTimes(+item.hearttimes)}</span>
                </div>
                }
                <div className={classnames('flex-item', styles.replay)}>
                  <span><Icon type={require('../../../svg/discu.svg')} /></span>
                  <span className={styles.count}>{utils.renderTimes(+item.fellowtimes)}</span>
                </div>
              </div>
            </div>
            <div className={styles.middle}>
              <div className={styles.text} dangerouslySetInnerHTML={{ __html: utils.renderContent(item.content) }} />
            </div>
            <div className={styles.bottom}>
              {item.fellow_two_list.length > 0 && <ReplayInner item={item} token={this.props.token} sendid={this.props.sendid} />}
            </div>
          </div>
        </div>
      )
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderHeader={ListHeader}
        renderFooter={() => (
          <div style={{ textAlign: 'center', paddingTop: '6px' }}>
            {this.state.isLoading ? <Icon type="loading" /> : '没有更多数据了~'}
          </div>
        )}
        renderRow={row}
        className={styles.replay_list}
        pageSize={10}
        scrollRenderAheadDistance={500}
        scrollEventThrottle={20}
        useBodyScroll
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
      />
    )
  }
}

export default ReplayList
