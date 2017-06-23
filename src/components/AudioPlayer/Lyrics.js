import React, { Component } from 'react'
// import classnames from 'classnames'
import $ from 'jQuery'
import lyric from './lyric'
import styles from './Lyrics.less'

let player
let lyricContainer

class Lyrics extends Component {
  constructor(props) {
    super(props)

    this.state = {
      lyricList: [],
    }
  }

  componentDidMount() {
    player = document.getElementById('audio')
    lyricContainer = document.getElementById('lyricContainer')
    player.addEventListener('canplay', () => {
      lyric.getLyric(this.props.url, (lyricList) => {
        this.setState({ lyricList })
        player.play()
      })
    })

    player.addEventListener('timeupdate', (e) => {
      this.state.lyricList.forEach((item, i) => {
        if (e.target.currentTime > item[0] - 0.5) { /* preload the lyric by 0.50s*/
          const line = $(`#line-${i}`)
          line.addClass('current-line-1').siblings('p').removeClass('current-line-1')
          lyricContainer.style.top = `-${line[0].offsetTop}px`
        }
      })
    })
  }

  render() {
    const { lyricList } = this.state

    return (
      <div className={styles.lyric_wrapper}>
        <div className={styles.lyric_container} id="lyricContainer">
          {lyricList.map((item, key) => (
            <p key={key} id={`line-${key}`}>{item[1]}</p>
          ))}
        </div>
      </div>
    )
  }
}

export default Lyrics
