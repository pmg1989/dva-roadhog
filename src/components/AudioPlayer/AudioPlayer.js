import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import { Slider, Icon } from 'antd-mobile'
import $ from 'jquery'
import lyric from './lyric'
import styles from './AudioPlayer.less'

// const SliderWithTooltip = createTooltip(Slider)
let player
let lyricContainer
let showFlag

class AudioPlayer extends Component {

  static propTypes = {
    cover: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    lrcUrl: PropTypes.string,
    lrcData: PropTypes.string,
    lrcClick: PropTypes.bool,
  }

  static lrcList = []
  static lrcListLength = 0

  static parseTime(time) {
    let min = String(parseInt(time / 60, 10))
    let sec = String(parseInt(time % 60, 10))
    if (min.length === 1) {
      min = `0${min}`
    }
    if (sec.length === 1) {
      sec = `0${sec}`
    }
    return `${min}:${sec}`
  }

  constructor(props) {
    super(props)

    this.state = {
      isPlay: false,
      currentTime: 0,
      totalTime: 0,
      percent: 0,
      lyricList: [],
      lrcStatus: true, // true： 两行歌词；false：多行歌词
      isSliding: false,
      lrcClick: props.lrcClick,
      isShow: true,
    }
  }

  componentDidMount() {
    player = document.getElementById('audio')
    lyricContainer = document.getElementById('lyricContainer')

    player.addEventListener('canplay', (e) => {
      player.play()
      if (this.props.lrcUrl) {
        lyric.getLyric(this.props.lrcUrl, (lyricList) => {
          AudioPlayer.lrcList = lyricList
          AudioPlayer.lrcListLength = lyricList.length
          this.setState({ lyricList, totalTime: e.target.duration, isPlay: true })
        })
      } else if (this.props.lrcData) {
        const lyricList = lyric.parseLyric(this.props.lrcData)
        AudioPlayer.lrcList = lyricList
        AudioPlayer.lrcListLength = lyricList.length
        this.setState({ lyricList, totalTime: e.target.duration, isPlay: true })
      }

      this.hideControls()
    })

    player.addEventListener('ended', () => {
      this.setState({ isPlay: false, isShow: true })
    })

    player.addEventListener('timeupdate', (e) => {
      const { currentTime, duration } = e.target
      const oldTop = this.state.lrcStatus ? 0 : 200
      for (let i = AudioPlayer.lrcListLength - 1; i >= 0; i -= 1) {
        if (currentTime > AudioPlayer.lrcList[i].time - 0.5) { /* preload the lyric by 0.50s*/
          const line = $(`#line-${i}`)
          line.addClass('current-line-1').siblings('p').removeClass('current-line-1')
          lyricContainer.style.top = `${oldTop - line[0].offsetTop}px`
          break
        }
      }
      !this.state.isSliding && this.setState({ currentTime, percent: (currentTime / duration) * 100 })
    })
  }

  handlePlayPause(e) {
    e.stopPropagation()
    if (this.state.isPlay) {
      player.pause()
    } else {
      player.play()
    }
    this.setState(prevState => ({
      isPlay: !prevState.isPlay,
    }))
    this.hideControls()
  }

  changeLrcType() {
    if (this.state.lrcClick) {
      this.setState(prevState => ({
        lrcStatus: !prevState.lrcStatus,
        isShow: true,
      }))
    } else {
      this.showControls()
    }
  }

  showControls() {
    this.setState({ isShow: true })
    this.hideControls()
  }

  hideControls() {
    if (showFlag) {
      clearTimeout(showFlag)
    }
    showFlag = setTimeout(() => {
      this.state.isPlay && this.setState({ isShow: false })
    }, 3000)
  }

  render() {
    const { lyricList, percent, currentTime, totalTime, isPlay, lrcStatus, isShow } = this.state
    const { source, cover } = this.props

    const slideProps = {
      step: 0.1,
      value: percent,
      onChange: (per) => {
        this.setState({ percent: per, isSliding: true, isShow: true, currentTime: (percent * totalTime) / 100 })
      },
      onAfterChange: (per) => {
        this.setState({ isSliding: false })
        player.currentTime = player.duration * (per / 100)
        this.hideControls()
      },
      trackStyle: {
        backgroundColor: '#4AD87F',
        height: '3px',
      },
      railStyle: {
        backgroundColor: '#cfcbd0',
        height: '3px',
      },
      handleStyle: {
        borderColor: '#4AD87F',
        height: '16px',
        width: '16px',
        marginLeft: '-7px',
        marginTop: '-7px',
        backgroundColor: '#fff',
        boxShadow: '0 0 1px 1px #4AD87F',
      },
    }

    const boxProps = {
      className: styles.box,
      onClick: ::this.changeLrcType,
      style: {
        background: `url('${cover}') no-repeat center center`,
        backgroundSize: 'cover',
      },
    }

    return (
      <div {...boxProps}>
        <div className={styles.container}>
          <div className={classnames(styles.lyric_wrapper, { [styles.nomarl]: !lrcStatus })}>
            <div className={styles.lyric_container} id="lyricContainer">
              {lyricList.map((item, key) => (
                <p key={key} id={`line-${key}`}>{item.text}</p>
              ))}
              {lyricList.length === 0 && <p>歌词加载中...</p>}
            </div>
          </div>
          <div className={classnames(styles.slider_box, { [styles.show]: isShow })} onClick={e => e.stopPropagation()}>
            <span className={styles.curtime}>{AudioPlayer.parseTime(currentTime)}</span>
            <Slider {...slideProps} />
            <span className={styles.duration}>{AudioPlayer.parseTime(totalTime)}</span>
          </div>
          <audio id="audio" src={source} autoPlay="autoplay">audio not supported :(</audio>
        </div>
        <div className={classnames(styles.opt_box, { [styles.show]: isShow })}>
          <div onClick={::this.handlePlayPause}>
            {!isPlay && <Icon type={require('../../svg/festival/play.svg')} />}
            {isPlay && <Icon type={require('../../svg/festival/pause.svg')} />}
          </div>
        </div>
      </div>
    )
  }
}

export default AudioPlayer
