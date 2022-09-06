

import React, {useEffect, useRef, useState} from 'react';

import { ReactComponent as CompassZeroLayer} from './assets/Compass_0Layer.svg'

import { ReactComponent as CompassOneLayer} from './assets/Compass_1Layer.svg'

import { ReactComponent as CompassTwoLayer} from './assets/Compass_2Layer.svg'

import { ReactComponent as CompassTopLayer} from './assets/Compass_TopLayer.svg'

import styles from './css/CompassRose.module.css'

const CompassRose = () => {


  const compassElement = useRef(null);

  const oneLayerWrapElement = useRef(null);

  const twoLayerWrapElement = useRef(null)

  const [compassHover, setCompassHover] = useState(false);

  useEffect(() => {
    compassElement.current.style.animationDuration = compassHover ?  '1s' : '6s'
    twoLayerWrapElement.current.style.animationName = compassHover ?  'hoverCounterClockwise' : 'baseCounterClockwise'

    // console.log(compassElement.current.animationDuration)
  }, [compassHover])


  return (
    <>
    <div
    ref={compassElement}
    id={styles.compassHolder}
    className={styles.compass}
    onMouseEnter={() => setCompassHover(true)}
    onMouseLeave={() => setCompassHover(false)}
    >
      <CompassTopLayer className={`${styles.topLayer} ${styles.compass}`} />
      <CompassTwoLayer className={`${styles.twoLayer} ${styles.compass}`}
      ref={twoLayerWrapElement}/>
      <CompassOneLayer className={`${styles.oneLayer} ${styles.compass}`} />
      <CompassZeroLayer className={`${styles.zeroLayer} ${styles.compass}`} />
    </div>
    </>
)
}






export default CompassRose

