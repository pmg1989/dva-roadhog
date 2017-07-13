import React from 'react'
import styles from './FaceQQ.less'

const faceList = Array.from(new Array(75), (val, index) => index + 1)

const FaceQQ = () => {
  const handleClick = (em) => {
    setFaceQQ(em) // setFaceQQ is from ./MenuTool.js
  }

  return (
    <div id="faceBox" className={styles.face_box}>
      <div className={styles.box}>
        {faceList.map(cur => (
          <span key={cur} className={styles.item}>
            <img onClick={() => handleClick(`[em_${cur}]`)} src={`/arclist/${cur}.gif`} alt={cur} style={{ width: 'initial' }} />
          </span>
        ))}
      </div>
    </div>
  )
}

export default FaceQQ
