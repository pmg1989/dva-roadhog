import React from 'react'
import { Tabs, Icon, Slider } from 'antd-mobile'
// import classnames from 'classnames'
import { renderDate, renderTimes, renderThumbs } from 'utils/tools'
import { ViewList } from 'NbComponent'
import styles from './List.less'

const TabPane = Tabs.TabPane

const EmptyList = ({ children }) => (
  <div className={styles.empty_list}>
    {children || <p>~~暂无数据哦~~</p>}
  </div>
)

const CourseBox = ({ list, onDownLoadClick }) => {
  const slideProps = {
    disabled: true,
    defaultValue: 60,
    trackStyle: {
      backgroundColor: '#02CB23',
      height: '2px',
    },
    railStyle: {
      backgroundColor: '#cfcbd0',
      height: '2px',
    },
    handleStyle: {
      borderColor: '#02CB23',
      height: '10px',
      width: '10px',
      marginLeft: '-4px',
      marginTop: '-4px',
      backgroundColor: '#02CB23',
    },
  }

  return (
    <ul className={styles.course_box}>
      {list.map((item, key) => (
        <li key={key} className={styles.container_box} onClick={onDownLoadClick}>
          <div className={styles.inner_box}>
            <div className={styles.top}>
              <div className={styles.thumb_box}>
                <img src={`${renderThumbs(item.image, 128, 72)}`} alt="" />
              </div>
              <div className={styles.course_info}>
                <span className={styles.title}>{item.title}</span>
                <div>
                  <span className={styles.name}>
                    {item.teacher && item.teacher.name}
                    {true && <img alt="" className={styles.ident} src={'/images/icon_identification.png'} />}
                  </span>
                  <div className={styles.bottom_info}>
                    <div className={styles.tips_box}>
                      <span>{item.interest && item.interest.nameChinese}</span>
                      <span className={styles.dot}>·</span>
                      <span>初级</span>
                    </div>
                    <span className={styles.gray}>0人已订阅</span>
                  </div>
                </div>
              </div>
            </div>
            {!item.complete &&
              <div className={styles.bottom}>
                <span>更新中 {item.lesson_qty}/{item.lesson_qty}</span>
                <div className={styles.slider_box}>
                  <Slider {...slideProps} />
                  <span className={styles.gray}>学习进度</span>
                </div>
              </div>
            }
            {item.complete &&
              <div className={styles.bottom}>
                <span>完结</span>
                <span className={styles.price_nb}>{item.nb_price}牛币</span>
              </div>
            }
          </div>
        </li>
      ))}
      {!list.length && <EmptyList />}
    </ul>
  )
}

const UpdateCourseBox = ({ onDownLoadClick }) => (
  <div>
    <div className={styles.title_box}>
      <span>课时更新</span>
    </div>
    <ul className={styles.list_box}>
      <li onClick={onDownLoadClick}>
        <div className={styles.thumb} style={{
          background: 'url(\'https://o9u2lnvze.qnssl.com/course/course1_lesson1_thumb.jpg?1501581185&imageView2/1/w/44/h/44\') no-repeat center center',
          backgroundSize: 'cover' }}
        />
        <div className={styles.info}>
          <div><span className={styles.gray}>[课时5]</span>最有效的呼吸方式-胸腹式</div>
          <div>
            <span className={styles.light_gray}>
              <Icon className={styles.icon_discu} type={require('../../../svg/discu.svg')} />5454
            </span>
            <span className={styles.light_gray}>
              <Icon className={styles.icon_discu} type={require('../../../svg/discu.svg')} />06:30
            </span>
          </div>
        </div>
        <div className={styles.opt}>
          <Icon className={styles.icon_download} type={require('../../../svg/festival/lock.svg')} />
        </div>
      </li>
      <li onClick={onDownLoadClick}>
        <div className={styles.thumb} style={{
          background: 'url(\'https://o9u2lnvze.qnssl.com/course/course1_lesson1_thumb.jpg?1501581185\') no-repeat center center',
          backgroundSize: 'cover' }}
        />
        <div className={styles.info}>
          <div><span className={styles.gray}>[课时5]</span>最有效的呼吸方式-胸腹式最有效的呼吸方式-胸腹式</div>
          <div>
            <span className={styles.light_gray}>
              <Icon className={styles.icon_discu} type={require('../../../svg/discu.svg')} />5454
            </span>
            <span className={styles.light_gray}>
              <Icon className={styles.icon_discu} type={require('../../../svg/discu.svg')} />06:30
            </span>
          </div>
        </div>
        <div className={styles.opt}>
          <Icon className={styles.icon_download} type={require('../../../svg/festival/download.svg')} />
        </div>
      </li>
      <li onClick={onDownLoadClick}>
        <div className={styles.thumb} style={{
          background: 'url(\'https://o9u2lnvze.qnssl.com/course/course1_lesson1_thumb.jpg?1501581185\') no-repeat center center',
          backgroundSize: 'cover' }}
        />
        <div className={styles.info}>
          <div><span className={styles.gray}>[课时5]</span>最有效的呼吸方式-胸腹式最有效的呼吸方式-胸腹式</div>
          <div>
            <span className={styles.light_gray}>
              <Icon className={styles.icon_discu} type={require('../../../svg/discu.svg')} />5454
            </span>
            <span className={styles.light_gray}>
              <Icon className={styles.icon_discu} type={require('../../../svg/discu.svg')} />06:30
            </span>
          </div>
        </div>
        <div className={styles.opt}>
          <span className={styles.btn}>免费试听</span>
        </div>
      </li>
      <EmptyList />
    </ul>
  </div>
)

const DynamicBox = ({ userCover, list, hasMore, queryMoreList, onDownLoadClick }) => {
  const Row = (item, sectionID, rowID) => {
    return (
      <div key={rowID} className={styles.container_box} onClick={onDownLoadClick}>
        <div className={styles.inner_box}>
          <div className={styles.top_box}>
            <span className={styles.title}>{item.content}</span>
            <span className={styles.date}>{renderDate(item.ctime)}</span>
          </div>
          <div className={styles.middle_box}>
            {(item.cover || userCover) &&
              <div className={styles.thumb} style={{
                background: `url('${renderThumbs(item.cover || userCover, 44, 44)}') no-repeat center center`,
                backgroundSize: 'cover' }}
              />
            }
            <div className={styles.box}>
              <div className={styles.title}>{item.data && item.data.title}</div>
              <div className={styles.des}>{item.data && item.data.content}</div>
            </div>
          </div>
          <div className={styles.bottom_box}>
            <div className={styles.replay}>
              <span><Icon type={require('../../../svg/discu.svg')} /></span>
              <span className={styles.count}>{renderTimes(0)}</span>
            </div>
            <div className={styles.like}>
              <span><Icon type={require('../../../svg/unlike.svg')} /></span>
              <span className={styles.count}>{renderTimes(0)}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const viewListProps = {
    dataSource: list,
    hasMore,
    queryMoreList,
    Header: null,
    Row,
    className: styles.dynamic_list,
    footerMsg: {
      empty: <p>暂无动态~</p>,
      noMore: '没有更多动态了哦~',
    },
  }

  return (
    <ViewList {...viewListProps} />
  )
}

const Content = ({
  userCover,
  courses,
  activities,
  hasMore,
  onQueryActivities,
  onQueryMoreActivities,
  onDownLoadClick,
}) => {
  const handleTabChange = (key) => {
    if (key === '3' && !activities.length) {
      onQueryActivities()
    }
  }

  return (
    <div className={styles.content_box}>
      <div className={styles.content}>
        <div className={styles.tab_box}>
          <Tabs defaultActiveKey="1" swipeable={false} onChange={handleTabChange}>
            <TabPane tab="课程" key="1">
              <CourseBox list={courses} onDownLoadClick={onDownLoadClick} />
              <UpdateCourseBox onDownLoadClick={onDownLoadClick} />
            </TabPane>
            <TabPane tab="正在学习" key="2">
              <CourseBox list={courses} onDownLoadClick={onDownLoadClick} />
            </TabPane>
            <TabPane tab="动态" key="3">
              <DynamicBox hasMore={hasMore} userCover={userCover} list={activities} queryMoreList={onQueryMoreActivities} onDownLoadClick={onDownLoadClick} />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default Content
