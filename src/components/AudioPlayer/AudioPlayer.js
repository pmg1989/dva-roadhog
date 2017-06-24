import React, { Component } from 'react'
import classnames from 'classnames'
import { Slider, Icon } from 'antd-mobile'
import $ from 'jQuery'
import lyric from './lyric'
import styles from './AudioPlayer.less'

// const SliderWithTooltip = createTooltip(Slider)
let player
let lyricContainer

class AudioPlayer extends Component {

  static handleChangeSlider(percent) {
    player.currentTime = player.duration * (percent / 100)
  }

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
      lrcStatus: true, //true： 两行歌词；false：多行歌词
    }
  }

  componentDidMount() {
    player = document.getElementById('audio')
    lyricContainer = document.getElementById('lyricContainer')

    player.addEventListener('canplay', (e) => {
      lyric.getLyric(this.props.lrc, (lyricList) => {
        this.setState({ lyricList, totalTime: e.target.duration, isPlay: true })
        player.play()
      })
    })

    player.addEventListener('ended', () => {
      this.setState({ isPlay: false })
    })

    player.addEventListener('timeupdate', (e) => {
      const { currentTime, duration } = e.target
      let oldTop = this.state.lrcStatus ? 0 : 200
      this.state.lyricList.forEach((item, i) => {
        if (currentTime > item[0] - 0.5) { /* preload the lyric by 0.50s*/
          const line = $(`#line-${i}`)
          line.addClass('current-line-1').siblings('p').removeClass('current-line-1')
          lyricContainer.style.top = oldTop - line[0].offsetTop + 'px'//`(100 - ${line[0].offsetTop})px`
        }
      })
      this.setState({ currentTime, percent: (currentTime / duration) * 100 })
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
  }

  changeLrcType() {
    this.setState(prevState => ({
      lrcStatus: !prevState.lrcStatus,
    }))
  }

  render() {
    const { lyricList, percent, currentTime, totalTime, isPlay, lrcStatus } = this.state
    const { source } = this.props

    const slideProps = {
      step: 0.1,
      value: percent,
      onChange: AudioPlayer.handleChangeSlider,
      trackStyle: {
        backgroundColor: '#52a9eb',
        height: '3px',
      },
      railStyle: {
        backgroundColor: '#cfcbd0',
        height: '3px',
      },
      handleStyle: {
        borderColor: '#52a9eb',
        height: '12px',
        width: '12px',
        marginLeft: '-4px',
        marginTop: '-4px',
        backgroundColor: '#fff',
        boxShadow: '0 0 1px 1px #52a9eb',
      },
    }

    return (
      <div className={styles.box} onClick={::this.changeLrcType}>
        <div className={styles.container}>
          <div className={classnames(styles.lyric_wrapper, { [styles.nomarl] : !lrcStatus })}>
            <div className={styles.lyric_container} id="lyricContainer">
              {lyricList.map((item, key) => (
                <p key={key} id={`line-${key}`}>{item[1]}</p>
              ))}
              {lyricList.length === 0 && <p>歌词加载中...</p>}
            </div>
            <div className={styles.opt_box} onClick={::this.handlePlayPause}>
              {!isPlay && <Icon type={require('../../svg/festival/play.svg')} />}
              {isPlay && <Icon type={require('../../svg/festival/pause.svg')} />}
            </div>
          </div>
          <div className={styles.slider_box} onClick={(e) => e.stopPropagation()}>
            <span className={styles.curtime}>{AudioPlayer.parseTime(currentTime)}</span>
            <Slider {...slideProps} />
            <span className={styles.duration}>{AudioPlayer.parseTime(totalTime)}</span>
          </div>
          <audio id="audio" src={source}>audio not supported :(</audio>
        </div>
      </div>
    )
  }
}

export default AudioPlayer
