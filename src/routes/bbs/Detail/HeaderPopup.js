import React, { Component } from 'react'
import { Popover, Icon, Modal, Toast } from 'antd-mobile'
import { Header } from 'NbComponent'
import { removeHTMLTag } from 'utils/tools'
import styles from './HeaderPopup.less'

const Item = Popover.Item
const alert = Modal.alert

class HeaderPopup extends Component {

  state = {
    visible: false,
    selected: '',
  }

  onSelect = (opt) => {
    this.setState({
      visible: false,
      selected: opt.props.value,
    })

    switch (opt.props.value) {
      case '1': {
        const { item } = this.props
        const content = removeHTMLTag(item.content)
        const shareParams = {
          title: item.title,
          content: content.length > 50 ? `${content.substring(0, 50)}...` : content,
          image: item.user_img,
          url: item.share_url,
        }
        console.log(shareParams)
        break
      }
      case '2':
        alert('举报', '确定举报此贴吗?', [
          { text: '取消' },
          { text: '确定',
            onPress: () => Toast.success('举报成功!', 2),
            style: { fontWeight: 'bold' },
          },
        ])
        break
      case '3':
        alert('删除', '确定删除此贴吗?', [
          { text: '取消' },
          { text: '确定',
            onPress: () => this.props.deleteSend(),
            style: { fontWeight: 'bold' },
          },
        ])
        break
      default:
        break
    }
  }

  handleVisibleChange = (visible) => {
    this.setState({
      visible,
    })
  }

  render() {
    const { showDelete, sendStatus } = this.props

    const baseOverlay = ([
      <Item key="1" value="1" icon={<Icon type={require('../../../svg/share-whrite.svg')} size="xs" />}>分享</Item>,
      <Item key="2" value="2" icon={<Icon type={require('../../../svg/release.svg')} size="xs" />}>举报</Item>,
    ])

    const Overlay = showDelete ? ([
      ...baseOverlay,
      <Item key="3" value="3" icon={<Icon type={require('../../../svg/cancel.svg')} size="xs" />}>
        <span style={{ marginRight: 5 }}>删除</span>
      </Item>,
    ]) : baseOverlay

    const headerProps = sendStatus ? {
      rightContent: (
        <Popover
          visible={this.state.visible}
          overlay={Overlay}
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
    } : {}

    return (
      <Header {...headerProps}>帖子详情</Header>
    )
  }
}

export default HeaderPopup
