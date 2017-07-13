import React, { Component } from 'react'
import { connect } from 'dva'
import classnames from 'classnames'
import { Flex } from 'antd-mobile'
import { Header, Editable } from 'NbComponent'
import styles from './index.less'

class Replay extends Component {

  state = {
    content: '',
    place: '',
    longitude: '',
    latitude: '',
  }

  handleReplay() {
    const { content, place, longitude, latitude } = this.state
    !!content.length &&
    this.props.dispatch({
      type: 'bbsReplay/addReplay',
      payload: {
        content, place, longitude, latitude,
      },
    })
  }

  render() {
    const { location } = this.props
    const { content } = this.state
    const { debug, userName } = location.query
    const replayStatus = !!content.length

    const headerProps = {
      rightContent: (
        <Flex>
          <Flex className="navbar-right-content">
            <span className={classnames({ [styles.disabled]: !replayStatus })} onClick={::this.handleReplay}>发布</span>
          </Flex>
        </Flex>
      ),
    }

    const editablePorps = {
      isDebug: debug === '1',
      html: content,
      userName,
      onChange: (html) => {
        this.setState({ content: html })
      },
      onSetAddress: ({ place, latitude, longitude }) => {
        this.setState({ place, latitude, longitude })
      },
    }

    return (
      <div>
        <Header {...headerProps}>发布帖子</Header>
        <div className={classnames('content', styles.content)}>
          <Editable {...editablePorps} />
        </div>
      </div>
    )
  }
}

export default connect(({ bbsReplay }) => ({ bbsReplay }))(Replay)
