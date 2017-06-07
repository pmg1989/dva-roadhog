import React, { Component } from 'react'
import classnames from 'classnames'
import { ListView, Icon } from 'antd-mobile'
import utils from 'utils'
import styles from './ReplayList.less'

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
    this.props.like({ fellowid: item.bbsfellowid })
  }

  handleUnLike(e, item) {
    e.stopPropagation()
    this.props.unlike({ fellowid: item.bbsfellowid })
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
        <div key={rowID} className="flex-box list-view-row">
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
