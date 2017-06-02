import React from 'react'
import classnames from 'classnames'
import ListView from '../ListView'
import styles from './Content.less'

const Content = ({ navOpen, ...listViewProps }) => {
  return (
    <div className={classnames(navOpen ? '' : 'content', styles.content)}>
      <div id="ir-bd-wrapper">
        <div className="ir-bd-scroller">
          <ListView {...listViewProps} />
        </div>
      </div>
    </div>
  )
}

export default Content
