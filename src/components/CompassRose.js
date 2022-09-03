

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
      {/* <div className={`${styles.oneLayer} + ${styles.compass}`}>test</div> */}
       <CompassOneLayer id={styles.oneLayer} className={`${styles.oneLayer} + ${styles.compass}`}/>
      <CompassTwoLayer id={styles.twoLayer} className={styles.compass}/>
      <CompassZeroLayer id={styles.zeroLayer} className={styles.compass} />
      <CompassTopLayer id={styles.topLayer} className={styles.compass}/>
    </div>
    </>
)
}


export default CompassRose

