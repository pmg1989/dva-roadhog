import React from 'react'
import Loading from './Loading'
// import classnames from 'classnames'

const handleClick = (item) => {
  console.log(item.bbs_sendid)
}

const List = ({ list, loading }) => {
  return (
    <div className="ir-wrapper">
      <ul className="ir-scroller">
        <Loading loading={loading} />
        {list && list.map((item, key) => {
          return (
            <li key={key} className="clear-fix" onClick={() => handleClick(item)}>
              <img src={item.user_img} alt={item.title} />
              <div className="li-body">
                <h3>{item.title}</h3>
                <p>{item.user_name}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default List
