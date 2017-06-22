import React, { Component, PropTypes } from 'react'
import { ListView, Icon } from 'antd-mobile'

class ViewList extends Component {

  static propTypes = {
    dataSource: PropTypes.array.isRequired,
    hasMore: PropTypes.bool.isRequired,
    queryMoreList: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired,
    Header: PropTypes.func,
    Row: PropTypes.func.isRequired,
  }

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
    const { Header, Row, className } = this.props
    const { dataSource, isLoading } = this.state

    return (
      <ListView
        dataSource={dataSource}
        renderHeader={Header}
        renderFooter={() => (
          <div style={{ textAlign: 'center', paddingTop: '6px' }}>
            {isLoading ? <Icon type="loading" /> : '没有更多数据了~'}
          </div>
        )}
        renderRow={Row}
        className={className}
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

export default ViewList
