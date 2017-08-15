import React from 'react'

const Loading = ({ loading }) => {
  if (!loading) {
    return null
  }
  return (
    <li className="clear-fix">
      <div className="loader">
        <div className="line-scale">
          <div /><div /><div />
          <div /><div />
        </div>
      </div>
    </li>
  )
}

export default Loading
