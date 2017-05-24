import React, { Component } from 'react'
import { Popover, Icon } from 'antd-mobile'
import { Header } from '../../../components'
import styles from './HeaderPopup.less'

const Item = Popover.Item

class HeaderPopup extends Component {

  state = {
    visible: true,
    selected: '',
  }

  onSelect = (opt) => {
    console.log(opt.props.value)
    this.setState({
      visible: false,
      selected: opt.props.value,
    })
  }

  handleVisibleChange = (visible) => {
    this.setState({
      visible,
    })
  }

  render() {
    const headerProps = {
      rightContent: (
        <Popover
          visible={this.state.visible}
          overlay={[
              (<Item key="1" value="1" icon={<Icon type={require('../../../svg/cancel.svg')} size="xs" />}>分享</Item>),
              (<Item key="2" value="2" icon={<Icon type={require('../../../svg/release.svg')} size="xs" />}>举报</Item>),
              (<Item key="3" value="3" icon={<Icon type={require('../../../svg/cancel.svg')} size="xs" />}>
                <span style={{ marginRight: 5 }}>删除</span>
              </Item>),
          ]}
          popupAlign={{
            overflow: { adjustY: 0, adjustX: 0 },
            offset: [-10, 10],
          }}
          onVisibleChange={this.handleVisibleChange}
          onSelect={this.onSelect}
        >
          <div className={styles['right-icon-box']}>
            <Icon type="ellipsis" />
          </div>
        </Popover>
      ),
    }

    return (
      <Header {...headerProps}>帖子详情</Header>
    )
  }
}

export default HeaderPopup
