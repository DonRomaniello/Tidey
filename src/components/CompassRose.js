

import React from 'react';


import { ReactComponent as CompassZeroLayer} from './assets/Compass_0Layer.svg'

import { ReactComponent as CompassOneLayer} from './assets/Compass_1Layer.svg'

import { ReactComponent as CompassTwoLayer} from './assets/Compass_2Layer.svg'

import { ReactComponent as CompassTopLayer} from './assets/Compass_TopLayer.svg'

import styles from './css/CompassRose.module.css'

const CompassRose = () => {

  return (
    <>
    <div id={styles.compassHolder} className={styles.compass}>
       <CompassOneLayer className={`${styles.oneLayer} + ${styles.compass}`}/>
      <CompassTwoLayer className={`${styles.twoLayer} + ${styles.compass}`}/>
      <CompassZeroLayer className={`${styles.zeroLayer} + ${styles.compass}`} />
      <CompassTopLayer className={`${styles.topLayer} + ${styles.compass}`}/>
    </div>
    </>
)
}


export default CompassRose

