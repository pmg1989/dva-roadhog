import React from 'react'
import { Tabs, Icon } from 'antd-mobile'
import { Link } from 'dva/router'
import classnames from 'classnames'
import { renderDuratiton, renderThumbs } from 'utils/tools'
import Video from '../../bbs/Video'
import styles from './Content.less'

const TabPane = Tabs.TabPane

const EmptyList = ({ children }) => (
  <div className={styles.empty_list}>
    {children || <p>~~暂无数据哦~~</p>}
  </div>
)

const TopBox = ({ item }) => (
  <div className={styles.container_box}>
    <div className={classnames(styles.inner_box, styles.top_box)}>
      <div className={styles.title_box}>
        <h4 className={styles.title}>{item.title}</h4>
        <div className={styles.tips_box}>
          <span>{{ master_course: '明星巨作', base_course: '牛班精品' }[item.type] || '牛班精品'}</span>
          <span className={styles.dot}>·</span>
          <span>{item.interest && item.interest.nameChinese}</span>
          <span className={styles.dot}>·</span>
          <span>初级</span>
        </div>
      </div>
      <div className={styles.price_box}>
        <span className={styles.price}>{item.nb_price}</span>牛币
        <span className={styles.old_price_box}> / 原价：
          <span className={styles.old_price}>{item.oldPrice}</span>牛币
        </span>
        <br />
        只需：<span className={styles.rmb_price}>{item.price}元</span>
      </div>
      <div className={styles.hot_box}>
        <span className={styles.hot_info}><span className={styles.tag}>限时6折</span>1天12小时45分23秒</span>
        <span>0人已订阅</span>
      </div>
    </div>
  </div>
)

const TeacherBox = ({ item, onDownLoadClick }) => (
  <div className={styles.container_box}>
    <div className={styles.inner_box}>
      <div className={styles.thumbs_box}>
        <div className={styles.thumb} style={{
          background: `url('${item.teacher.image}') no-repeat center center`,
          backgroundSize: 'cover' }}
        />
        <div className={styles.info_box}>
          <div className={styles.info}>
            <span className={styles.name}>{item.teacher.name}</span>
            <span className={styles.tag} onClick={onDownLoadClick}>+ 关注</span>
          </div>
          <span className={styles.des}>{item.teacher.about}</span>
        </div>
      </div>
    </div>
  </div>
)

const TabBox = ({ item, onDownLoadClick }) => (
  <div className={styles.container_box}>
    <div className={classnames(styles.inner_box, styles.tab_box)}>
      <Tabs defaultActiveKey="1" swipeable={false}>
        <TabPane tab="课程详情" key="1">
          <div className={styles.detail_box} dangerouslySetInnerHTML={{ __html: item.description }} />
        </TabPane>
        <TabPane tab="课时列表" key="2">
          {item.lessons && !item.lessons.length &&
            <EmptyList />
          }
          {item.lessons && !!item.lessons.length &&
          <ul className={styles.list_box}>
            <li style={{ padding: '0 0 10px' }} onClick={onDownLoadClick}>
              <a className={styles.download_patch} href="javascript:;">
                批量下载<Icon className={styles.icon_download} type={require('../../../svg/down-load.svg')} />
              </a>
            </li>
            {item.lessons.map((cur, key) => {
              return (
                <li key={key} onClick={onDownLoadClick}>
                  <div className={styles.thumb} style={{
                    background: `url('${renderThumbs(item.thumbnail, 44, 44)}') no-repeat center center`,
                    backgroundSize: 'cover' }}
                  />
                  <div className={styles.info}>
                    <div><span className={styles.gray}>[课时${key}]</span>{cur.title}</div>
                    <div>
                      <span className={styles.light_gray}>
                        <Icon className={styles.icon_discu} type={require('../../../svg/discu.svg')} />0
                      </span>
                      <span className={styles.light_gray}>
                        <Icon className={styles.icon_discu} type={require('../../../svg/discu.svg')} />{cur.duration && renderDuratiton(cur.duration)}
                      </span>
                    </div>
                  </div>
                  <div className={styles.opt}>
                    {cur.isFree === 'false' && cur.hasPreview === 'false' && <Icon className={styles.icon_download} type={require('../../../svg/festival/lock.svg')} />}
                    {cur.isFree === 'true' && cur.hasPreview === 'false' && <Icon className={styles.icon_download} type={require('../../../svg/festival/download.svg')} />}
                    {cur.hasPreview === 'true' && <a href="javascript:;" className={styles.btn}>免费试听</a>}
                  </div>
                </li>
              )
            })
            }
          </ul>
          }
        </TabPane>
      </Tabs>
    </div>
  </div>
)

const HotBox = ({ token, list, onDownLoadClick }) => (
  <div className={styles.hot_list_box}>
    <div className={styles.title_box}>
      <span>热门推荐</span>
      <a className={styles.more} href="javascript:;" onClick={onDownLoadClick}>
        更多<Icon className={styles.icon_more} type={require('../../../svg/enterinto_fill.svg')} />
      </a>
    </div>
    <div className={styles.hot_container}>
      <ul className={styles.hot_list}>
        {list.map((item, key) => (
          <li key={key}>
            <Link to={`/course/detail/${+item.id + 1}?token=${token}&share=1`}>
              <img alt={item.title} src={item.cover_image} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
)

const Content = ({ token, item, recommendList, onDownLoadClick }) => (
  <div className={styles.content_box}>
    {item.preview_video && !!item.preview_video.length && <Video src={item.preview_video} cover={item.image} />}
    {!item.preview_video && <img className={styles.cover} src={item.image} alt={item.title} />}
    <div className={styles.content}>
      <TopBox item={item} />
      {item.teacher && <TeacherBox item={item} onDownLoadClick={onDownLoadClick} />}
      <TabBox item={item} onDownLoadClick={onDownLoadClick} />
      <HotBox token={token} list={recommendList} onDownLoadClick={onDownLoadClick} />
    </div>
  </div>
)

export default Content
