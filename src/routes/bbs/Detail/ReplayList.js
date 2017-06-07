import React, { Component } from 'react'
import { ListView, Icon } from 'antd-mobile'
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
    const row = (rowData, sectionID, rowID) => {
      return (
        <div key={rowID} className="row">
          <div className="row-title">{rowData.username}</div>
          <div style={{ display: 'flex', padding: '0.3rem 0' }}>
            <img style={{ height: '1.28rem', marginRight: '0.3rem' }} src={rowData.userimg} alt="icon" />
            <div className="row-text">
              <div><span style={{ fontSize: '0.6rem', color: '#FF6E27' }}>{rowData.bbsfellowid}</span></div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderHeader={() => <span>header</span>}
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
