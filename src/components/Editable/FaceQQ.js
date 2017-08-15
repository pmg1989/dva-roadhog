import React, { Component } from 'react'
import styles from './FaceQQ.less'

const faceList = Array.from(new Array(75), (val, index) => index + 1)

class FaceQQ extends Component {

  componentDidMount() {
    document.querySelector('#faceBox').addEventListener('touchstart', (e) => {
      e.preventDefault()
    })
  }

  render() {
    return (
      <div id="faceBox" className={styles.face_box}>
        <div id="faceBoxInner" className={styles.box}>
          {faceList.map(cur => (
            <span key={cur} className={styles.item}>
              <img onClick={() => setFaceQQ(`[em_${cur}]`)} src={`/arclist/${cur}.gif`} alt={cur} style={{ width: 'initial' }} />
            </span>
          ))}
        </div>
      </div>
    )
  }
}

export default FaceQQ
