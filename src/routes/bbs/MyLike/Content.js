import React from 'react'
import classnames from 'classnames'
import { ListView } from 'NbComponent'
import styles from './Content.less'

const Content = ({ ...listViewProps }) => {
  return (
    <div className={classnames('content', styles.content)}>
      <div id="ir-bd-wrapper">
        <div className="ir-bd-scroller">
          <ListView {...listViewProps} />
        </div>
      </div>
    </div>
  )
}

export default Content
