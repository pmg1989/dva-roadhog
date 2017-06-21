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

  render() {
    const ListHeader = () => {
      const { total } = this.props

      return (
        <div className={classnames('flex-box', styles.header)}>
          <div className="flex-item">
            评论&nbsp;(<span>{total}</span>)
          </div>
        </div>
      )
    }

    const row = (item, sectionID, rowID) => {
      return (
        <div key={rowID} className="list-view-row">
          <div className={styles.info}>
            <div className={styles.thumb_box}>
              <img src={item.userimg} alt={item.username} />
              <span className={styles.name}>{item.username}</span>
            </div>
            <span className={styles.date}>{utils.renderDate(item.senddate)}</span>
          </div>
          <div className={styles.text}
            dangerouslySetInnerHTML={{ __html: utils.renderContent(item.content) }}
          />
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
