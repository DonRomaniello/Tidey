

import React, {useState} from 'react';


import { ReactComponent as CompassZeroLayer} from './assets/Compass_0Layer.svg'

import { ReactComponent as CompassOneLayer} from './assets/Compass_1Layer.svg'

import { ReactComponent as CompassTwoLayer} from './assets/Compass_2Layer.svg'

import { ReactComponent as CompassTopLayer} from './assets/Compass_TopLayer.svg'

import styles from './css/CompassRose.module.css'

const CompassRose = () => {

  const [compassHover, setCompassHover] = useState(false);


  const hoverClass = (layerClass) => {
    if (compassHover) {
      return styles[layerClass + 'Hover']
    }
  }

  return (
    <>
    <div
    id={styles.compassHolder}
    className={styles.compass}
    onMouseEnter={() => setCompassHover(true)}
    onMouseLeave={() => setCompassHover(false)}
    >
      <CompassTopLayer className={`${styles.topLayer} ${styles.compass}`} />
      <CompassTwoLayer className={`${hoverClass('twoLayer')} ${styles.twoLayer} ${styles.compass}`}/>
      <CompassOneLayer className={`${hoverClass('oneLayer')} ${styles.oneLayer} ${styles.compass}`}/>
      <CompassZeroLayer className={`${styles.zeroLayer} ${styles.compass}`} />
    </div>
    </>
)
}


export default CompassRose

